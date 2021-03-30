import * as pageComponentService from './pageComponent.service';

export async function createPageComponent(req, res, next) {
  try {
    const { body } = req;
    const pageComponent = await pageComponentService.createPageComponent(body);
    return res.json({
      success: true,
      payload: pageComponent
    });
  } catch (error) {
    return next(error);
  }
}

export async function getAll(req, res, next) {
  try {
    const { limit, page } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 0,
      limit: parseInt(limit, 10) || 5,
    };
    const pageComponent = await pageComponentService.getAll(pageOptions);
    return res.json({
      success: true,
      payload: pageComponent
    });
  } catch (error) {
    return next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const pageComponentId = req.params.id;
    const pageComponent = await pageComponentService.getById(pageComponentId);
    return res.json({
      success: true,
      payload: pageComponent
    });
  } catch (error) {
    return next(error);
  }
}

export async function updatePageComponent(req, res, next) {
  try {
    const pageComponentId = req.params.id;
    const { body } = req;
    const pageComponent = await pageComponentService.updatePageComponent(pageComponentId, body);
    return res.json({
      success: true,
      payload: pageComponent
    });
  } catch (error) {
    return next(error);
  }
}

export async function deletePageComponent(req, res, next) {
  try {
    const pageComponentId = req.params.id;
    const pageComponent = await pageComponentService.deletePageComponent(pageComponentId);
    return res.json({
      success: true,
      payload: 'delete pageComponent completed'
    });
  } catch (error) {
    return next(error);
  }
}

export async function countPageComponent(req, res, next) {
  try {
    const number = await pageComponentService.countPageComponent();
    return res.json({
      success: true,
      payload: number
    });
  } catch (error) {
    return next(error);
  }
}