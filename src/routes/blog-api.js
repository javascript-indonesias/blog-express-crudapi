import express from 'express';
import bodyParser from 'body-parser';
import {
    addBlogs,
    getAllBlogs,
    getDetailBlog,
    deleteBlog,
} from '../repository/blog-crud';
import {
    validateDeleteBlog,
    validateCreateBlogAPI,
    validateResultRequest,
} from '../services/validation-sanitizer';

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// all the controller and utility functions here:
async function getListBlogs(_req, res) {
    try {
        const resultblog = await getAllBlogs();
        res.json({ status: true, message: 'sukses', data: resultblog });
    } catch (err) {
        res.json({
            status: false,
            message: 'Daftar blog tidak tersedia',
            data: [],
        });
    }
}

async function createNewBlogs(req, res) {
    const arrayErrorReqs = validateResultRequest(req).errors;

    if (arrayErrorReqs.length > 0) {
        // terdapat error dari data yang dikirim
        res.status(400).json({
            status: false,
            message: 'Error memasukkan data blog',
            errors: arrayErrorReqs,
        });
    } else {
        // Data tidak ada yang error dan tidak mencurigakan
        const { body } = req;
        try {
            const result = await addBlogs(body.title, body.snippet, body.text);
            res.json({ status: true, message: 'sukses', data: result });
        } catch (err) {
            res.json({ status: false, message: 'Error memasukkan data blog' });
        }
    }
}

async function getBlogDetail(req, res) {
    const idBlog = req.params.id;
    try {
        const result = await getDetailBlog(idBlog);
        res.json({ status: true, message: 'sukses', data: result });
    } catch (err) {
        res.json({ status: false, message: 'Error mengambil data blog' });
    }
}

async function deleteBlogById(req, res) {
    const idBlog = req.params.id;

    const errorReqs = validateResultRequest(req);
    const arrayErrorReqs = errorReqs.errors;
    if (arrayErrorReqs.length > 0) {
        res.status(400).json({ errors: arrayErrorReqs });
    } else {
        try {
            const result = await deleteBlog(idBlog);
            res.json({
                status: true,
                message: 'sukses',
                data: result,
                redirect: '/blogs',
            });
        } catch (err) {
            res.json({ status: false, message: 'Gagal menghapus data blog' });
        }
    }
}

// Definisikan router di sini dari setiap controller di atas
function getBlogAPIRoutes() {
    const router = express.Router();
    router.get('/blog-list', jsonParser, getListBlogs);
    router.post(
        '/create-blog',
        validateCreateBlogAPI,
        urlencodedParser,
        createNewBlogs,
    );
    router.get('/blogs/:id', getBlogDetail);
    router.delete('/delete/:id', validateDeleteBlog, deleteBlogById);
    return router;
}

export default getBlogAPIRoutes;
