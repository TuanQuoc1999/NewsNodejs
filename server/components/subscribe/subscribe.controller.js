import * as SubscribeService from './subscribe.service';

export async function subscribe(req, res, next) {
  try {
    const sub = await SubscribeService.subscribe();
    return res.json({
      success: true,
      payload: 'Subscribe success! '
    });
  } catch (error) {
    return next(error);
  }
}

export async function unSubscribe( req, res, next) {
  try {
    const sub = await SubscribeService.unSubscribe();
    return res.json({
      success: true,
      payload: 'UnSubscribe success!'
    });
  } catch (error) {
    return next(error);
  }
}

export async function countSub(req, res, next) {
  try {
    const number = await SubscribeService.countSub();
    return res.json({
      success: true,
      payload: number
    });
  } catch (error) {
    return next(error);
  }
}