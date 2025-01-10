import { ApiResponseOptions } from "@nestjs/swagger";

export const GetNasaPhotoFindOneOkSchema: ApiResponseOptions = {
  description: 'Nasa photo has been found successfully',
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
        description: 'Nasa photo data',
        example: {
          explanation: 'explanation',
          hdurl: 'hdurl',
          url: 'url',
        },
      }
    }
  }
};
