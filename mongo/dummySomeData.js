/**
 * Run the scripts to create initial data
 * @returns {Promise<boolean>}
 */

import bcrypt from 'bcryptjs';
import logger from '../server/util/logger';
import User from '../server/components/user/user.model';
import { BCRYPT_SALT_ROUNDS } from '../server/constants';

async function createDummyUser() {
  try {
    const numUser = await User.countDocuments();
    if (numUser) {
      return true;
    }
    await User.create({
      email: 'admin@mail.com',
      firstName: 'le',
      lastName: 'tuanquoc',
      fullName: 'letuanquoc',
      password: bcrypt.hashSync('admin1234', BCRYPT_SALT_ROUNDS),
    });
    return true;
  } catch (error) {
    logger.error('dummySomeData error:');
    logger.error(error);
    throw error;
  }
}

export default async function dummySomeData() {
  try {
    // Todo: run your scripts to create dummy data
    await createDummyUser();
    logger.info('dummySomeData done');
    return true;
  } catch (error) {
    logger.error('dummySomeData error:');
    logger.error(error);
    throw error;
  }
}
