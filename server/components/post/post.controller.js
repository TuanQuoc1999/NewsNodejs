import * as PostService from './post.service';

export async function createPost(req, res, next) {
  try {
    const { idPageComponent, name, title, content } = req.body;
    const image = req.files;
    const newPost = await PostService.createPost(idPageComponent, name, title, content, image);
    return res.json({
      success: true,
      payload: newPost
    });
  } catch (error) {
    return next(error);
  }
}

export async function updatePost(req, res, next) {
  try {
    const postId = req.params.id;
    const { body } = req;
    const post = await PostService.updatePost(postId, body);
    return res.json({
      success: true,
      payload: post
    });
  } catch (error) {
    return next(error);
  }
}

export async function deletePost(req, res, next) {
  try {
    const postId = req.params.id;
    const post = await PostService.deletePost(postId);
    return res.json({
      success: true,
      payload: 'delete post completed'
    });
  } catch (error) {
    return next(error);
  }
}

export async function getAll(req, res, next) {
  try {
    const { page, limit } = req.query;
    const pageOptions = {
      page : parseInt(page, 10) || 5,
      limit: parseInt(limit, 10) || 0
    };
    const post = await PostService.getAll(pageOptions);
    return res.json({
      success: true,
      payload: post
    });
  } catch (error) {
    return next(error);
  }
}

export async function getByID( req, res, next) {
  try {
    const postId = req.params.id;
    const post = await PostService.getByID(postId);
    return res.json({
      success: true,
      payload: post
    });
  } catch (error) {
    return next(error);
  }
}

export async function uploadImage( req, res, next ) {
  try {
    const postId = req.params.id;
    const image = req.files;
    const imagePost = await PostService.uploadImage( postId, image );
    return res.json({
      success: true,
      payload: image
    });
  } catch (error) {
    return next(error);
  }
}

export async function countPost(req, res, next) {
  try {
    const number = await PostService.countPost();
    return res.json({
      success: true,
      payload: number
    });
  } catch (error) {
    return next(error);
  }
}