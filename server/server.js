import mongoose from 'mongoose';
import app from './api/index';
import { SERVER_PORT, MONGO_URI } from './config';
import logger from './util/logger';
import dummySomeData from '../mongo/dummySomeData';
import initUploadFolders from './util/InitFolders';

initUploadFolders();
// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(async () => {
  logger.info('Mongodb connected');
  if (process.env.NODE_ENV === 'development') {
    dummySomeData().catch((error) => {
      console.error('dummySomeData error');
      console.error(error);
    });
  }
}).catch((error) => {
  logger.error('Please make sure Mongodb is installed and running!');
  throw error;
});

app.listen(SERVER_PORT, (error) => {
  if (error) {
    logger.error('Cannot start backend services:');
    logger.error(error);
  } else {
    logger.info(`Backend service is running on port: ${SERVER_PORT}${process.env.NODE_APP_INSTANCE ? ` on core ${process.env.NODE_APP_INSTANCE}` : ''}!`);
  }
});

export default app;
