import { getAllBlogs, getDetailBlog, addBlogs } from '../repository/blog-crud';
import logger from '../utils/config-winston';

const dateFooter = new Date();
const stringWaktuSekarang = `Dibuat oleh NetKucing @ ${dateFooter.getFullYear()}`;

// Blog routing

const modelHome = {
    title: 'Home',
};

const getBlogIndex = async (_req, res) => {
    try {
        const result = await getAllBlogs();
        res.render('blogs/home', {
            model: modelHome,
            blogs: result.data,
            strwaktu: stringWaktuSekarang,
        });
    } catch (error) {
        logger.error(error);
    }
};

// Membuka halaman detail dari blog yang dipilih
const modelDetail = { title: 'Blog Detail' };

const getBlogDetail = async (req, res) => {
    // Menerima kiriman id untuk detail blog
    const idBlog = req.params.id;

    try {
        const blogItem = await getDetailBlog(idBlog);
        logger.info(blogItem);
        res.render('blogs/details', {
            blog: blogItem,
            model: modelDetail,
            strwaktu: stringWaktuSekarang,
        });
    } catch (error) {
        logger.error(error);
        res.status(404);
        res.render('404', { title: '404 Blog tidak ditemukan' });
    }
};

const modelCreate = {
    title: 'Buat Tulisan Baru',
};
const createBlogPage = (_req, res) => {
    // Membuat blog baru
    res.render('blogs/createblog', {
        model: modelCreate,
        strwaktu: stringWaktuSekarang,
    });
};

const createBlogPost = async (req, res) => {
    // Menerima kiriman data dari blog create
    // Terima kiriman request post buat blog
    logger.info(req.body);
    const titleBlog = req.body.title;
    const snippetBlog = req.body.snippet;
    const isiBlog = req.body.body;

    try {
        // simpan ke database mongodb
        const resultBlog = await addBlogs(titleBlog, snippetBlog, isiBlog);
        if (resultBlog) {
            logger.info(resultBlog);
            res.redirect('/blogs');
        }
    } catch (error) {
        logger.error(error);
    }
};

const modelAbout = {
    title: 'About Page',
};

const getAboutPage = (_req, res) => {
    res.render('about', {
        model: modelAbout,
        strwaktu: stringWaktuSekarang,
    });
};

const redirectAboutPage = (_req, res) => {
    res.redirect('/blogs/about-us');
};

module.exports = {
    getBlogIndex,
    getBlogDetail,
    createBlogPage,
    createBlogPost,
    getAboutPage,
    redirectAboutPage,
};
