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

export const getUsers = async () => {
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

export const getUser = async (id) => {
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
    console.log('body', body);
    const validation = validateBody(required, properties, body);

    if (!validation.valid)
      return new Response(JSON.stringify({ message: validation.message }), {
        status: 400,
      });

    try {
      const userData = await retrieveDataById('users', id);
      if (!userData)
        return new Response(JSON.stringify({ message: 'User not found' }), {
          status: 404,
        });

      if (body.nrp) {
        const checkNrp = await retrieveDataByField('users', 'nrp', body.nrp);
        if (checkNrp.length > 0) {
          if (checkNrp[0]['id-users'] !== id)
            return new Response(JSON.stringify({ message: 'NRP already exists' }), {
              status: 422,
            });
        }
      }
      console.log('ini', validation.data);
      if (body.password) {
        const hashPassword = await bcrypt.hash(body.password, 10);
        validation.data.password = hashPassword;
      }

      const userUpdated = await updateData('users', id, mergeObjects(userData, validation.data));

      if (userUpdated)
        return new Response(JSON.stringify({ message: 'Update berhasil', data: userUpdated }), {
          status: 200,
        });
    } catch (error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: `Invalid request, request body! required key: ${required}` }),
      {
        status: 422,
      }
    );
  }
};
export const updatePassword = async (id, request) => {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return new Response(JSON.stringify({ message: 'Password is required' }), {
        status: 400,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const userUpdated = await updateData('users', id, { password: hashPassword });

    if (userUpdated) {
      return new Response(JSON.stringify({ message: 'Password updated successfully' }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
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
        return new Response(JSON.stringify({ message: 'NRP already exists' }), {
          status: 422,
          headers: { 'Content-Type': 'application/json' },
        });

      const hashPassword = await bcrypt.hash(body.password, 10);
      validation.data.password = hashPassword;

      const newUserData = await createData('users', validation.data);
      if (newUserData)
        return new Response(
          JSON.stringify({ message: 'Berhasil menambah akun', data: newUserData }),
          {
            status: 201,
          }
        );
    } catch (error) {
      return new Response(JSON.stringify({ message: error.message }), {
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
      return new Response(JSON.stringify({ message: 'User deleted' }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
