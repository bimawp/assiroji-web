import {
  createData,
  deleteData,
  mergeObjects,
  retrieveData,
  retrieveDataByField,
  retrieveDataById,
  updateData,
  validateBody,
} from '@/service';
import bcrypt from 'bcrypt';
import { getToken } from 'next-auth/jwt';
export const validateToken = async (req) => {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token || token.role !== 'Admin') {
      return {
        authorized: false,
        response: new Response('Token unauthorized', { status: 401 }),
      };
    }
    return { authorized: true, token };
  } catch (error) {
    return {
      authorized: false,
      response: new Response('Error validating token', { status: 500 }),
    };
  }
};
export const getUsers = async (req) => {
  const { authorized, response } = await validateToken(req);
  if (!authorized) return response;
  try {
    const dataUsers = await retrieveData('users');
    if (dataUsers.length > 0)
      return new Response(JSON.stringify(dataUsers), {
        status: 200,
      });
    else
      return new Response('User not found', {
        status: 404,
      });
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    });
  }
};

export const getUser = async (id, req) => {
  const { authorized, response } = await validateToken(req);
  if (!authorized) return response;
  try {
    const dataUser = await retrieveDataById('users', id);
    if (dataUser) {
      return new Response(JSON.stringify(dataUser), {
        status: 200,
      });
    } else {
      return new Response('User not found', {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 200,
    });
  }
};

export const editUser = async (schema, id, request) => {
  console.log(`firebase: editUser(${id})`);
  const { required, properties } = schema;

  try {
    const body = await request.json();
    const validation = validateBody(required, properties, body);

    if (!validation.valid)
      return new Response(validation.message, {
        status: 400,
      });

    try {
      const userData = await retrieveDataById('users', id);
      if (!userData)
        return new Response('User not found', {
          status: 404,
        });

      if (body.username) {
        const checkUsername = await retrieveDataByField('users', 'username', body.username);
        if (checkUsername.length > 0) {
          if (checkUsername[0]['id-users'] !== id)
            return new Response('Username already exists', {
              status: 422,
            });
        }
      }

      if (body.password) {
        const hashPassword = await bcrypt.hash(body.password, 10);
        validation.data.password = hashPassword;
      }

      const userUpdated = await updateData('users', id, mergeObjects(userData, validation.data));

      if (userUpdated)
        return new Response(JSON.stringify(userUpdated), {
          status: 200,
        });
    } catch (error) {
      return new Response(JSON.stringify(error.message), {
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(`Invalid request, request body! required key: ${required}`, {
      status: 422,
    });
  }
};

export const createUser = async (schema, request) => {
  console.log(`firebase: createUser()`);
  const { required, properties } = schema;

  try {
    const body = await request.json();
    const validation = validateBody(required, properties, body);

    if (!validation.valid)
      return new Response(validation.message, {
        status: 400,
      });

    try {
      const checkUsername = await retrieveDataByField('users', 'nrp', body.nrp);
      if (checkUsername.length > 0)
        return new Response('nrp already exists', {
          status: 422,
        });

      const hashPassword = await bcrypt.hash(body.password, 10);
      validation.data.password = hashPassword;

      const newUserData = await createData('users', validation.data);
      if (newUserData)
        return new Response(JSON.stringify(newUserData), {
          status: 201,
        });
    } catch (error) {
      return new Response(JSON.stringify(error.message), {
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(`Invalid request, request body! required key: ${required}`, {
      status: 422,
    });
  }
};

export const deleteUser = async (id) => {
  console.log(`firebase: putUser(${id})`);
  try {
    const userData = await retrieveDataById('users', id);
    if (userData) {
      await deleteData('users', id);
      return new Response('User deleted', {
        status: 200,
      });
    } else {
      return new Response('User not found', {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(error.message, {
      status: 500,
    });
  }
};
