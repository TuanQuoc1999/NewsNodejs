import logger from '../../util/logger';
import APIError from '../../util/APIError';
import Page from './page.model';
import { body } from 'express-validator';

/**
 * 
 * @param {string} name 
 */
export async function createPage(name) {
	try {
		const page = await Page.findOne({ name: name });
		if (page) {
			return Promise.reject(new APIError(400, 'page exist'));
		}
		const newPage = new Page({
			name: name
		});
		await newPage.save();
		return Promise.resolve(newPage);
	} catch (error) {
		logger.error('page add error:', error);
		throw new APIError(500, 'Internal server error');
	}
}

/**
 * 
 * @param {string} pageId 
 */
export async function updatePage(pageId, body) {
	try {
		const page = await Page.findById(pageId);
		if (!page) {
			return Promise.reject(new APIError(404, 'page not found'));
		}
		Object.keys(body).forEach((key) => {
			page[key] = body[key];
		});
		await page.save();
		return page;
	} catch (error) {
		logger.error('update page error', error);
		throw new APIError(500, 'Internal Server Error');
	}
}

/**
 * 
 * @param  pageOptions limit and page for pagination
 */
export async function getAll(pageOptions) {
	const { limit, page } = pageOptions;
	try {
		const pageDetail = await Page.find()
			.sort({ createdAt: -1 })
			.skip(limit * page)
			.limit(limit)
			.exec();
		return pageDetail;
	} catch (error) {
		logger.error('get all page error', error);
		throw new APIError(500, 'Internal Server Error');
	}
}
/**
 * 
 * @param {string} pageId 
 */
export async function getById(pageId) {
	try {
		const page = await Page.findById(pageId);
		if (!page) {
			return Promise.resolve(new APIError(404, ' page not found!'));
		}
		return page;
	} catch (error) {
		logger.error('get page by id error', error);
		throw new APIError(500, 'Internal Server Error');
	}
}

export async function deletePage(pageId) {
	try {
		const page = await Page.findById(pageId);
		if (!page) {
			return Promise.reject(new APIError(404, 'page not found'));
		}
		await page.remove;
		return page;
	} catch (error) {
		logger.error(' delete page error', error);
		throw new APIError(500, 'Internal Server Error');
	}
}

export async function countPage() {
  try {
    const count = await Page.countDocuments();
    return count;
  } catch (error) {
    logger.error('Count PageComponent error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}