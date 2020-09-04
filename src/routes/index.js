import express from 'express';
// any other routes imports would go here
import getBlogAPIRoutes from './blog-api';
import getBlogViewRoutes from './blog-view';

function getBlogAPIRouter() {
    const router = express.Router();
    // any additional routes would go here
    router.use('/blog', getBlogAPIRoutes());
    return router;
}

// Router untuk view blog
function getBlogViewRouter() {
    const router = express.Router();
    router.use('/blogs', getBlogViewRoutes());
    router.use('/', (_req, res) => {
        res.redirect('/blogs');
    });
    return router;
}

export { getBlogViewRouter, getBlogAPIRouter };
