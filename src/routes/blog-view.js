import express from 'express';
import {
    getBlogIndex,
    createBlogPage,
    getAboutPage,
    redirectAboutPage,
    getBlogDetail,
    createBlogPost,
} from '../controllers/blog-controller';
import { validateCreateBlog } from '../services/validation-sanitizer';

// Controller middleware dibuat di file terpisah
function getBlogViewRoutes() {
    const router = express.Router();
    // Blog routing
    // Daftar semua blog, descending date
    router.get('/', getBlogIndex);
    // Halaman membuat blog
    router.get('/create', createBlogPage);
    router.get('/about-us', getAboutPage);
    router.get('/about', redirectAboutPage);
    // Membuka halaman detail dari blog yang dipilih
    router.get('/:id', getBlogDetail);

    // ENDPOINT REST API
    // API untuk Mengirim kiriman data blog
    router.post('/', validateCreateBlog, createBlogPost);
    // Hapus data blog yang ditulis
    return router;
}

export default getBlogViewRoutes;
