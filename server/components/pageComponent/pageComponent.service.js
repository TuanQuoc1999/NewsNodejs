import logger from '../../util/logger';
import APIError from '../../util/APIError';
import PageComponent from './pageComponent.model';

/**
 * 
 * @param  body idPage, name, title, description need be input
 */
export async function createPageComponent( body ) {
  try {
    const pageComponent = await PageComponent.findOne({ name : body.name });
    if( pageComponent ) {
      return Promise.reject(new APIError(400, 'PageComponent exist'));
    }
    const newpageComponent = new PageComponent({
      idPage: body.idPage,
      name: body.name,
      title: body.title,
      description: body.description
    });
    await newpageComponent.save();
    return Promise.resolve(newpageComponent);
  } catch (error) {
    logger.error(' create pageComponent error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}

/**
 * 
 * @param  pageOptions limit and page to do pagination
 */
export async function getAll( pageOptions) {
    try {
      const { page, limit } = pageOptions;
      const pageComponent = await PageComponent.find()
        .sort({ createdAt: -1 })
        .skip(limit * page)
        .limit(limit)
        .exec();
      return pageComponent;
    } catch (error) {
      logger.error('get all PageComponent Error', error);
      throw new APIError( 500, 'Internal Server Error');
    }
}

export async function getById( pageComponentId ) {
  try {
    const pageComponent = await PageComponent.findById(pageComponentId);
    if( !pageComponent ) {
      return Promise.reject( new APIError(404, 'pageComponent not found'));
    }
    return pageComponent;
  } catch (error) {
    logger.error('get pagecomponent by Id error', error);
    throw new APIError( 500, 'Internal Server Error');
  }
}

export async function updatePageComponent( pageComponentId, body ) {
  try {
    const pageComponent = await PageComponent.findById(pageComponentId);
    console.log('pagecomponent', pageComponent);
    if( !pageComponent ) {
      return Promise.reject( new APIError(404, 'pageComponent not found'));
    }
    Object.keys(body).forEach((key) => {
      pageComponent[key] = body[key];
    });
    await pageComponent.save();
    console.log('newpagecomponent', pageComponent)
    return pageComponent;
  } catch (error) {
    logger.error('update PageComponent Error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}

export async function deletePageComponent( pageComponentId ) {
  try {
    const pageComponent = await PageComponent.findById( pageComponentId );
    if( !pageComponent ) {
      return Promise.reject(new APIError(404,' PageComponent not found'));
    }
    await pageComponent.remove(); 
    return pageComponent; 
  } catch (error) {
    logger.error('delete pageComponent Error',error);
    throw new APIError(500, 'Internal Server Error');
  }
}

export async function countPageComponent() {
  try {
    const count = await PageComponent.countDocuments();
    return count;
  } catch (error) {
    logger.error('Count PageComponent error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}