import { check, body, param, validationResult } from 'express-validator';

const validateCreateBlogAPI = [
    body('title')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 5 })
        .withMessage('Judul blog tidak boleh kosong')
        .escape()
        .trim(),
    body('snippet')
        .trim()
        .notEmpty({ checkFalsy: true, nullable: false })
        .isLength({ min: 5 })
        .withMessage('Isi snippet dengan benar')
        .escape(),
    check('text')
        .trim()
        .notEmpty({ checkFalsy: true, nullable: false })
        .withMessage('Isi konten blog tidak boleh kosong')
        .isLength({ min: 5 })
        .withMessage('Isi konten blog dengan benar')
        .escape(),
];

const validateCreateBlog = [
    body('title')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 5 })
        .withMessage('Judul blog tidak boleh kosong')
        .escape(),
    body('snippet')
        .trim()
        .notEmpty({ checkFalsy: true, nullable: false })
        .isLength({ min: 5 })
        .withMessage('Isi snippet dengan benar')
        .escape(),
    body('body')
        .trim()
        .notEmpty({ checkFalsy: true, nullable: false })
        .isLength({ min: 5 })
        .withMessage('Isi konten blog dengan benar')
        .escape(),
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
