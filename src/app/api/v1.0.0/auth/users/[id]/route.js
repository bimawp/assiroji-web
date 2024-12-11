import { getUser, editUser, deleteUser, updatePassword } from '../services';

export const openapi = {
  get: {
    description: 'Returns a user by ID.',
    summary: 'Get users by ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the user.',
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'OK',
      },
      404: {
        description: 'Not Found',
      },
    },
  },
  put: {
    description: 'Edit a user.',
    summary: 'Edit Users',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the user.',
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
      description: 'Data yang diperlukan',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              nrp: {
                type: 'string',
              },
              username: {
                type: 'string',
              },
              role: {
                type: 'string',
                enum: ['Admin', 'User'],
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'OK',
      },
      404: {
        description: 'Not Found',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  },
  delete: {
    description: 'Delete a user.',
    summary: 'Delete Users',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the user.',
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'OK',
      },
      404: {
        description: 'Not Found',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  },
  patch: {
    description: 'Update a user password.',
    summary: 'Update User Password',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the user.',
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
      description: 'New password for the user',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              password: {
                type: 'string',
              },
            },
            required: ['password'],
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Password updated successfully',
      },
      404: {
        description: 'Not Found',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  },
};

export const GET = async (request, { params }) => {
  return getUser(params.id);
};

export const PUT = async (request, { params }) => {
  const schema = openapi.put.requestBody.content['application/json'].schema;
  return editUser(schema, params.id, request);
};

export const DELETE = async (request, { params }) => {
  return deleteUser(params.id);
};

export const PATCH = async (request, { params }) => {
  return updatePassword(params.id, request);
};
