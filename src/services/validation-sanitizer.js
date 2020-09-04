import { check, body, param, validationResult } from 'express-validator';

const validateCreateBlogAPI = [
    body('title')
        .not()
        .isEmpty()
        .isLength({ min: 5 })
        .escape()
        .trim()
        .withMessage('Judul blog tidak boleh kosong'),
    body('snippet')
        .notEmpty({ checkFalsy: true, nullable: false })
        .isLength({ min: 5 })
        .escape()
        .trim()
        .withMessage('Isi snippet dengan benar'),
    check('text')
        .notEmpty({ checkFalsy: true, nullable: false })
        .isLength({ min: 5 })
        .escape()
        .trim()
        .withMessage('Isi konten blog dengan benar'),
];

const validateCreateBlog = [
    body('title')
        .not()
        .isEmpty()
        .isLength({ min: 5 })
        .escape()
        .trim()
        .withMessage('Judul blog tidak boleh kosong'),
    body('snippet')
        .notEmpty({ checkFalsy: true, nullable: false })
        .isLength({ min: 5 })
        .escape()
        .trim()
        .withMessage('Isi snippet dengan benar'),
    body('body')
        .notEmpty({ checkFalsy: true, nullable: false })
        .isLength({ min: 5 })
        .escape()
        .trim()
        .withMessage('Isi konten blog dengan benar'),
];

const validateDeleteBlog = [
    param('id')
        .notEmpty({ checkFalsy: true, nullable: false })
        .isLength({ min: 5 })
        .withMessage('Id blog yang akan dihapus tidak tersedia'),
];

const validateResultRequest = (req) => {
    const errorsResult = validationResult(req);
    return errorsResult;
};

export {
    validateCreateBlog,
    validateCreateBlogAPI,
    validateDeleteBlog,
    validateResultRequest,
};
