import path from 'path'
import multer, { StorageEngine } from 'multer'


interface IUploadConfig {
  driver: 's3' | 'disk'
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tmpFolder: tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {

        const filename = `${request.user.id}_avatar.jpg`;

        callback(null, filename);
      },
    }),
  },
  config: {
    aws: {
      bucket: 'dsmdeveloper-api-vendas',
    },
  },
} as IUploadConfig;
