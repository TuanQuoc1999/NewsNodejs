import { Router } from 'express';
import { isAuthorized } from '../../api/auth.middleware';
import * as SubscribeController from './subscribe.controller';

const router = new Router();

router.route('/subscribe')
  .post(
    // isAuthorized(),
    SubscribeController.subscribe,
  )

router.route('/unsubscribe')
  .post(
    // isAuthorized(),
    SubscribeController.unSubscribe,
  )

router.route('count/sub')
  .get(
    // isAuthorized(),
    SubscribeController.countSub,
  )
export default router;