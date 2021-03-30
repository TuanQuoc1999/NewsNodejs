import logger from '../../util/logger';
import APIError from '../../util/APIError';
import Contact from './contact.model';
import { body } from 'express-validator';

export async function createContact(body) {
  try {
    const contact = await Contact.findOne({ email : body.email });
    if( contact ) {
      return Promise.reject(new APIError(400, 'Contact exist!'));
    }
    const newContact = new Contact({
      email: body.email,
      phone: body.phone,
      fullName: body.fullName,
      note: body.note,
      status: body.status
    });
    await newContact.save();
    return newContact;
  } catch (error) {
    logger.error('Create Contact Error', error);
    throw new APIError(500,'Internal Server Error');
  }
}

export async function updateContact( contactId, body ) {
  try {
    const contact = await Contact.findById(contactId);
    if( !contact ) {
      return Promise.reject( new APIError(404, 'contact not found'));
    }
    Object.keys(body).forEach((key) => {
      contact[key] = body[key];
    });
    await contact.save();
    return contact;
  } catch (error) {
    logger.error('update contact Error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}

export async function deleteContact( contactId ) {
  try {
    const contact = await Contact.findById( contactId );
    if( !contact ) {
      return Promise.reject(new APIError(404, 'contact not found'));
    }
    await contact.remove();
    return contact;
  } catch (error) {
    logger.error('delete contact error', error);
    throw new APIError( 500, 'internal Server Error');
  }
}

export async function getAll( pageOptions ) {
  try {
    const {page, limit } = pageOptions;
    const contact = await Contact.find()
      .sort({ createdAt: -1 })
      .skip( limit * page )
      .limit( limit )
      .exec();
    return contact;
  } catch (error) {
    logger.error('getall contact error', error);
    throw new APIError( 500, 'Internal Server Error');
  }
}

export async function getById( contactId ) {
  try {
    const contact = await Contact.findById( contactId );
    if( !contact ) {
      return Promise.reject(new APIError(404, 'contact not found'));
    }
    return contact;
  } catch (error) {
    logger.error('get contact error', error);
    throw new APIError( 500, 'Internal Server Error');
  }
}

export async function countContact() {
  try {
    const count = await Contact.countDocuments();
    return count;
  } catch (error) {
    logger.error('Count Contact Error', error);
    throw new APIError( 500, 'Interal Server Error');
  }
}