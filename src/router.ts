import {Router} from 'express'
import {body, oneOf, validationResult} from "express-validator";
import {handleInputErrors} from "./modules/middleware";
import {createProduct, deleteProduct, getOneProduct, getProducts, updateProduct} from "./handlers/product";
import {createUpdate, getAllUpdates, getOneUpdate, refreshUpdate, deleteUpdate} from "./handlers/update";

const router = Router()
//PRODUCT
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)

const productPostMiddlewareValidations = [
    body('name').isString(),
    handleInputErrors
]
router.post('/product', productPostMiddlewareValidations, createProduct)
router.delete('/product/:id', deleteProduct)

const updatePutMiddlewareValidations = [
    body(['title', 'body', 'version']).isString().optional(),
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']),
    handleInputErrors
]

const updatePostMiddlewareValidations = [
    body(['title', 'body', 'productId']).isString().exists(),
    handleInputErrors
]

router.get('/update', getAllUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id', updatePutMiddlewareValidations, refreshUpdate)
router.post('/update', updatePostMiddlewareValidations, createUpdate)
router.delete('/update/:id', deleteUpdate)


router.get('/updatepoints', () => {})
router.get('/updatepoints/:id', () => {})

const pointsPutMiddlewareValidations = [
    body(['name', 'description']).isString().optional(),
    body('updatedAt').isDate(),
    handleInputErrors
]
router.put('/updatepoints/:id', pointsPutMiddlewareValidations,() => {})


const pointsPOSTMiddlewareValidations = [
    body(['name', 'description']).isString().exists(),
    body('updatedAt').isDate(),
    handleInputErrors
]
router.post('/updatepoints', pointsPOSTMiddlewareValidations,() => {})
router.delete('/updatepoints/:id', () => {})

export default router