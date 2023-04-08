import {Router} from 'express'
import {body, oneOf, validationResult} from "express-validator";
import {handleInputErrors} from "./modules/middleware";

const router = Router()
//PRODUCT
router.get('/product', (req, res) => {
    res.json({message: 'kjhvjhgv'})
})
router.get('/product/:id', () => {})
router.put('/product/:id', body('name').isString(), handleInputErrors)
//create product
const productPostMiddlewareValidations = [
    body('name').isString(),
    body('belongsToId').isNumeric(),
    handleInputErrors
]
router.post('/product', productPostMiddlewareValidations,() => {})
router.delete('/product/:id', () => {})

//UPDATE

router.get('/update', () => {})
router.get('/update/:id', () => {})
const updatePutMiddlewareValidations = [
    body(['title', 'body', 'version']).isString().optional(),
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']),
    handleInputErrors
]
router.put('/update/:id', updatePutMiddlewareValidations,() => {})
//create update

const updatePostMiddlewareValidations = [
    body(['title', 'body', 'version']).isString().exists(),
    handleInputErrors
]
router.post('/update', updatePostMiddlewareValidations, () => {})
router.delete('/update/:id', () => {})

//UPDATE POINTS

router.get('/updatepoints', () => {})
router.get('/updatepoints/:id', () => {})

const pointsPutMiddlewareValidations = [
    body(['name', 'description']).isString().optional(),
    body('updatedAt').isDate(),
    handleInputErrors
]
router.put('/updatepoints/:id', pointsPutMiddlewareValidations,() => {})
//create updatepoints
const pointsPOSTMiddlewareValidations = [
    body(['name', 'description']).isString().exists(),
    body('updatedAt').isDate(),
    handleInputErrors
]
router.post('/updatepoints', pointsPOSTMiddlewareValidations,() => {})
router.delete('/updatepoints/:id', () => {})

export default router