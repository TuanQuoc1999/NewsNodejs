import logger from '../../util/logger';
import APIError from '../../util/APIError';
import Subscribe from './subscribe.model';
import {
  IS_SUBSCRIBE,
} from '../../constants';

export async function subscribe() {
  try {
    const sub = new Subscribe({
      isSubscribe: IS_SUBSCRIBE.true,
    })
    await sub.save();
    return sub;
  } catch (error) {
    logger.error('Subscribe error', error);
    throw new APIError( 500, 'Internal Server Error');
  }
}

export async function unSubscribe() {
  try {
    const sub = new Subscribe({
      isSubscribe: IS_SUBSCRIBE.false,
    });
    await sub.save();
    return sub;
  } catch (error) {
    logger.error('UnSubscribe error', error);
    throw new APIError( 500, 'Internal Server Error');
  }
}

export async function countSub() {
  try {
    const sub = await Subscribe.findOne({isSubscribe: Subscribe.isSubscribe == true});
    const count = await sub.countDocuments();
    return count;
  } catch (error) {
    logger.error('Count Subscribe Error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}