import logger from '../../util/logger';
import APIError from '../../util/APIError';
import Post from './post.model';
import * as _ from 'lodash';


export async function createPost( idPageComponent, name, title, content, image ) {
  try {
    if( !_.isEmpty(image) ) {
      image = `uploads/image-post/${image.filename}`
    } else {
      image = null;
    }
    const newPost = new Post({
      idPageComponent,
      name,
      title,
      content,
      image
    });
    await newPost.save();
    return newPost;
  } catch (error) {
    logger.error('create Post error', error);
    throw new APIError( 500, 'Internal Server Error');
  }
}

export async function updatePost ( postId, body) {
  try {
    const post = await Post.findById( postId );
    if( !post ) {
      return Promise.reject(new APIError(404, 'post not found!'));
    }
    Object.keys(body).forEach((key) => {
      post[key] = body[key];
    });
    await post.save();
    return post;
  } catch (error) {
    logger.error('update post error', error);
    throw new APIError( 500, 'Internal Server Error');
  }
}

export async function deletePost( postId ) {
  try {
    const post = await Post.findById( postId );
    if( !post ) {
      return Promise.reject(new APIError(404, 'Post not found!'));
    }
    await post.remove();
    return post;
  } catch (error) {
    logger.error('delete post error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}

export async function getAll( pageOptions ) {
  try {
    const { page, limit } = pageOptions;
    const post = await Post.find()
      .sort({ createdAt: -1})
      .skip( page * limit)
      .limit( limit )
      .exec();
    return post;
  } catch (error) {
    logger.error('getall error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}

export async function getByID( postId ) {
  try {
    const post = await Post.findById( postId );
    if( !post ) {
      return Promise.reject(new APIError(404, 'post not found!'));
    }
    return post;
  } catch (error) {
    logger.error('post get by ID error', error);
    throw new APIError( 500, 'Internal Server Error');
  }
}

/**
 * 
 * @param {string} postId 
 * @param {array} image 
 */
export async function uploadImage( postId, image ) {
  try {
    const post = await Post.findById( postId );
    if( !post ) {
      return Promise.reject(new APIError(404, 'post not found!'));
    }
    post.image = `uploads/image-post/${image.filename}`;
    try {
      await post.save();
    } catch (error) {
      logger.error('upload image post error', error);
      throw new APIError( 500, 'internal Server Error');
    }
    return post.image;
  } catch (error) {
    logger.error('upload image post error', error);
    throw new APIError( 500, 'Internal Server Error');
  }
}

export async function countPost() {
  try {
    const count = await Post.countDocuments();
    return count;
  } catch (error) {
    logger.error('Count Post Error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}