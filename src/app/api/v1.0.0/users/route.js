import { createUser, getUsers } from './services';

export const openapi = {
  get: {
    description: 'Returns a list of users.',
    summary: 'Get users',
    responses: {
      200: {
        description: 'OK',
      },
      404: {
        description: 'Not Found',
      },
    },
  },
  post: {
    description: 'Send a new user.',
    summary: 'Add Users',
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
              password: {
                type: 'string',
              },
              role: {
                type: 'string',
                enum: ['Admin', 'User'],
              },
            },
            required: ['nrp', 'username', 'password', 'role'],
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Created',
      },
      400: {
        description: 'Bad Request',
      },
    },
  },
};

export const GET = async (request) => getUsers(request);

export const POST = async (request) => {
  const schema = openapi.post.requestBody.content['application/json'].schema;
  return createUser(schema, request);
};
