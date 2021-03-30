import * as pageService from './page.service';

export async function createPage(req, res, next) {
	try {
		const { name } = req.body;
		const page = await pageService.createPage(name);
		return res.json({
			success: true,
			payload: page,
		});
	} catch (error) {
		return next(error);
	}
}

export async function updatePage(req, res, next) {
	try {
		const pageId = req.params.id;
		const { body } = req;
		const page = await pageService.updatePage(pageId, body);
		return res.json({
			success: true,
			payload: page
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
		const pageDetail = await pageService.getAll(pageOptions);
		return res.json({
			success: true,
			payload: pageDetail
		});
	} catch (error) {
		return next(error);
	}
}

export async function getById(req, res, next) {
	try {
		const pageId = req.params.id;
		const page = await pageService.getById(pageId);
		return res.json({
			success: true,
			payload: page,
		});
	} catch (error) {
		return next(error);
	}
}

export async function deletePage(req, res, next) {
	try {
		const pageId = req.params.id;
		const page = await pageService.deletePage(pageId);
		return res.json({
			success: true,
			payload: 'page deleted success'
		});
	} catch (error) {
		return next(error);
	}
}

export async function countPage(req, res, next) {
  try {
    const number = await pageService.countPage();
    return res.json({
      success: true,
      payload: number
    });
  } catch (error) {
    return next(error);
  }
}