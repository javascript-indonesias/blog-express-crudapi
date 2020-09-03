import { body, param, validationResult } from 'express-validator';

const validateCreateBlog = [
    body('title')
        .not()
        .isEmpty()
        .isLength({ min: 5 })
        .withMessage('Judul blog tidak boleh kosong'),
    body('snippet')
        .notEmpty({ checkFalsy: true, nullable: false })
        .isLength({ min: 20 })
        .withMessage('Isi snippet dengan benar'),
    body('body')
        .notEmpty({ checkFalsy: true, nullable: false })
        .isLength({ min: 20 }),
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

export { validateCreateBlog, validateDeleteBlog, validateResultRequest };
