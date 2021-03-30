import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import { Router } from 'express';
import { MORGAN_FORMAT } from '../../constants';
import swaggerSpecV1 from './docs';

// User
import userRoute from '../../components/user/user.route';

//Page
import pageRoute from '../../components/page/page.route';

//pageComponent
import pageComponenRoute from '../../components/pageComponent/pageComponent.route';

//post
import postRoute from '../../components/post/post.route';

//contact
import contactRoute from '../../components/contact/contact.route';

//subscribe
import subscribeRoute from '../../components/subscribe/subscribe.route';

const router = new Router();
// User
router.use('/users', [userRoute]);

//Page
router.use('/pages', [pageRoute]);

//pageComponent
router.use('/pagecomponents',[pageComponenRoute]);

//post
router.use('/posts',[postRoute]);

//contact
router.use('/contacts',[contactRoute]);

//subscribe
router.use('/subscribes',[subscribeRoute]);

// Docs
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
  router.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => {
      if (req.originalUrl.includes('api-docs')) {
        return true;
      }
      return res.statusCode < 400;
    },
    stream: process.stderr,
  }));
  router.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => {
      if (req.originalUrl.includes('api-docs')) {
        return true;
      }
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  }));
  router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecV1));
} else {
  router.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr,
  }));
  router.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout,
  }));
}
export default router;
