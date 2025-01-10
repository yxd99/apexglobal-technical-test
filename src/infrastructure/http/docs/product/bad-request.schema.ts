import { ApiResponseOptions } from "@nestjs/swagger";

export const PostProductBadRequestSchema: ApiResponseOptions = {
  description: 'Missing or invalid request body or Product with id already exists',
  schema:{
    anyOf: [
      {
        properties: {
          code: {
            type: 'number',
            description: 'Error code',
            example: 400,
          },
          name: {
            type: 'string',
            description: 'Error name',
            example: 'Bad Request',
          },
          data: {
            type: 'array',
            description: 'Error data',
            example: ['product_id should not be empty', 'product_id must be a string', 'name should not be empty', 'name must be a string', 'description must be a string', 'price must not be less than 1', 'price must be a positive number', 'price must be a number conforming to the specified constraints', 'stock must not be less than 1', 'stock must be a positive number', 'stock must be a number conforming to the specified constraints'],
          },
        },
      },
      {
        properties: {
          code: {
            type: 'number',
            description: 'Error code',
            example: 400,
          },
          name: {
            type: 'string',
            description: 'Error name',
            example: 'Bad Request',
          },
          data: {
            type: 'string',
            description: 'Error data',
            example: 'Product with id 123 already exists',
          },
        },
      }
    ]
  }
};

export const PatchProductBadRequestSchema: ApiResponseOptions = {
  description: 'Invalid request body or Product with id not found',
  schema:{
    properties: {
      code: {
        type: 'number',
        description: 'Error code',
        example: 400,
      },
      name: {
        type: 'string',
        description: 'Error name',
        example: 'Bad Request',
      },
      data: {
        type: 'array',
        description: 'Error data',
        example: ['product_id should not be empty', 'product_id must be a string', 'name should not be empty', 'name must be a string', 'description must be a string', 'price must not be less than 1', 'price must be a positive number', 'price must be a number conforming to the specified constraints', 'stock must not be less than 1', 'stock must be a positive number', 'stock must be a number conforming to the specified constraints'],
      },
    }
  }
};
