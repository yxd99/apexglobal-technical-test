import { ApiResponseOptions } from "@nestjs/swagger";

export const PostProductCreatedSchema: ApiResponseOptions = {
  description: 'Product has been created successfully',
  schema: {
    properties: {
      code: {
        type: 'number',
        description: 'Status code',
        example: 201,
      },
      name: {
        type: 'string',
        description: 'Error name',
        example: 'Bad Request',
      },
      data: {
        type: 'object',
        description: 'Product data',
        example: {
          product_id: '16',
          name: 'product test',
          description: 'Description test',
          price: 100.2,
          stock: 10,
          created_at: '2025-01-10T21:13:14.865Z',
          updated_at: '2025-01-10T21:13:14.865Z', 
        },
      }
    }
  }
};
