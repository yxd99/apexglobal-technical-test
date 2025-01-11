export const ProductFindOneNotFoundSchema = {
  description: 'Product with id not found',
  schema: {
    properties: {
      code: {
        type: 'number',
        description: 'Status code',
        example: 404,
      },
      name: {
        type: 'string',
        description: 'Error name',
        example: 'Not Found',
      },
      data: {
        type: 'string',
        description: 'Error data',
        example: 'Product with id 123 not found',
      },
    },
  },
};
