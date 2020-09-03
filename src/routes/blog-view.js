import express from 'express';
import blogController from '../controllers/blog-controller';
import { validateCreateBlog } from '../services/validation-sanitizer';

function getBlogViewRoutes() {
    const router = express.Router();
    // Blog routing
    // Daftar semua blog, descending date
    router.get('/', blogController.getBlogIndex);
    // Halaman membuat blog
    router.get('/create', blogController.createBlogPage);
    router.get('/about-us', blogController.getAboutPage);
    router.get('/about', blogController.redirectAboutPage);
    // Membuka halaman detail dari blog yang dipilih
    router.get('/:id', blogController.getBlogDetail);

    // ENDPOINT REST API
    // API untuk Mengirim kiriman data blog
    router.post('/', validateCreateBlog, blogController.createBlogPost);
    // Hapus data blog yang ditulis
    return router;
}

export default getBlogViewRoutes;
