import logger from '../../util/logger';
import * as ContactService from './contact.service';

export async function createContact(req, res, next) {
  try {
    const { body } = req;
    const contact = await ContactService.createContact(body);
    return res.json({
      success: true,
      payload: contact
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateContact(req, res, next) {
  try {
    const contactId = req.params.id;
    const { body } = req;
    const contact = await ContactService.updateContact(contactId, body);
    return res.json({
      success: true,
      payload: contact
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteContact(req, res, next) {
  try {
    const contactId = req.params.id;
    const contact = await ContactService.deleteContact( contactId );
    return res.json({
      success: true,
      payload: 'delete completed!'
    });
  } catch (error) {
    return next(error);
  }
}

export async function getAll(req, res, next) {
  try {
    const { page, limit } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 0,
      limit: parseInt(limit, 10) || 5,
    };
    const contact = await ContactService.getAll( pageOptions );
    return res.json({
      success: true,
      payload: contact
    });
  } catch (error) {
    return next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const contactId = req.params.id;
    const contact = await ContactService.getById( contactId );
    return res.json({
      success: true,
      payload: contact
    });
  } catch (error) {
    return next(error);
  }
}

export async function countContact(req, res, next) {
  try {
    const number = await ContactService.countContact();
    return res.json({
      success: true,
      payload: number
    });
  } catch (error) {
    return next(error);
  }
}