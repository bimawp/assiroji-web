import {getUser, editUser, deleteUser} from "../services";

export const openapi = {
 get: {
  description: "Returns a user by ID.",
  summary: "Get users by ID",
  parameters: [
   {
    name: "id",
    in: "path",
    required: true,
    description: "The ID of the user.",
    schema: {
     type: "string",
    },
   },
  ],
  responses: {
   200: {
    description: "OK",
   },
   404: {
    description: "Not Found",
   },
  },
 },
 put: {
  description: "Edit a user.",
  summary: "Edit Users",
  parameters: [
   {
    name: "id",
    in: "path",
    required: true,
    description: "The ID of the user.",
    schema: {
     type: "string",
    },
   },
  ],
  requestBody: {
   description: "Data yang diperlukan",
   required: true,
   content: {
    "application/json": {
     schema: {
      type: "object",
      properties: {
       nama: {
        type: "string",
       },
       username: {
        type: "string",
       },
       password: {
        type: "string",
       },
      },
     },
    },
   },
  },
  responses: {
   200: {
    description: "OK",
   },
   404: {
    description: "Not Found",
   },
   422: {
    description: "Unprocessable Entity",
   },
  },
 },
 delete: {
  description: "Edit a user.",
  summary: "Edit Users",
  parameters: [
   {
    name: "id",
    in: "path",
    required: true,
    description: "The ID of the user.",
    schema: {
     type: "string",
    },
   },
  ],
  responses: {
   200: {
    description: "OK",
   },
   404: {
    description: "Unprocessable Entity",
   },
  },
 },
};

export const GET = async (request, {params}) => {
 return getUser(params.id);
};

export const PUT = async (request, {params}) => {
 const schema = openapi.put.requestBody.content["application/json"].schema;
 return editUser(schema, params.id, request);
};

export const DELETE = async (request, {params}) => {
 return deleteUser(params.id);
}