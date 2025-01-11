import { ApiResponseOptions } from '@nestjs/swagger';

export const GetProductFindOneOkSchema: ApiResponseOptions = {
  description: 'Product has been found successfully',
  schema: {
    properties: {
      code: {
        type: 'number',
        description: 'Status code',
        example: 200,
      },
      name: {
        type: 'string',
        description: 'Error name',
        example: 'OK',
      },
      data: {
        type: 'object',
        description: 'Product data',
        example: {
          productId: '16',
          name: 'product test',
          description: 'Description test',
          price: 100.2,
          stock: 10,
          created_at: '2025-01-10T21:13:14.865Z',
          updated_at: '2025-01-10T21:13:14.865Z',
        },
      },
    },
  },
};

export const GetProductFindAllOkSchema: ApiResponseOptions = {
  description: 'Products have been found successfully',
  schema: {
    properties: {
      code: {
        type: 'number',
        description: 'Status code',
        example: 200,
      },
      name: {
        type: 'string',
        description: 'Error name',
        example: 'OK',
      },
      data: {
        type: 'array',
        description: 'Products data',
        example: [
          {
            productId: '16',
            name: 'product test',
            description: 'Description test',
            price: 100.2,
            stock: 10,
            created_at: '2025-01-10T21:13:14.865Z',
            updated_at: '2025-01-10T21:13:14.865Z',
          },
          {
            productId: '17',
            name: 'product test 2',
            description: 'Description test 2',
            price: 100.2,
            stock: 10,
            created_at: '2025-01-10T21:13:14.865Z',
            updated_at: '2025-01-10T21:13:14.865Z',
          },
        ],
      },
    },
  },
};

export const PatchProductOkSchema: ApiResponseOptions = {
  description: 'Product has been updated successfully',
  schema: {
    properties: {
      code: {
        type: 'number',
        description: 'Status code',
        example: 200,
      },
      name: {
        type: 'string',
        description: 'Error name',
        example: 'OK',
      },
      data: {
        type: 'object',
        description: 'Product data',
        example: {
          productId: '16',
          name: 'product test',
          description: 'Description test',
          price: 100.2,
          stock: 10,
          created_at: '2025-01-10T21:13:14.865Z',
          updated_at: '2025-01-10T21:13:14.865Z',
        },
      },
    },
  },
};

export const DeleteProductOkSchema: ApiResponseOptions = {
  description: 'Product has been deleted successfully',
  schema: {
    properties: {
      code: {
        type: 'number',
        description: 'Status code',
        example: 200,
      },
      name: {
        type: 'string',
        description: 'Error name',
        example: 'OK',
      },
      data: {
        type: 'null',
        description: 'Null data',
        example: null,
      },
    },
  },
};
