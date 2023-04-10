"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middleware_1 = require("./modules/middleware");
var product_1 = require("./handlers/product");
var update_1 = require("./handlers/update");
var router = (0, express_1.Router)();
//PRODUCT
router.get('/product', product_1.getProducts);
router.get('/product/:id', product_1.getOneProduct);
router.put('/product/:id', (0, express_validator_1.body)('name').isString(), middleware_1.handleInputErrors, product_1.updateProduct);
var productPostMiddlewareValidations = [
    (0, express_validator_1.body)('name').isString(),
    middleware_1.handleInputErrors
];
router.post('/product', productPostMiddlewareValidations, product_1.createProduct);
router.delete('/product/:id', product_1.deleteProduct);
var updatePutMiddlewareValidations = [
    (0, express_validator_1.body)(['title', 'body', 'version']).isString().optional(),
    (0, express_validator_1.body)('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    middleware_1.handleInputErrors
];
var updatePostMiddlewareValidations = [
    (0, express_validator_1.body)(['title', 'body', 'productId']).isString().exists(),
    middleware_1.handleInputErrors
];
router.get('/update', update_1.getAllUpdates);
router.get('/update/:id', update_1.getOneUpdate);
router.put('/update/:id', updatePutMiddlewareValidations, update_1.refreshUpdate);
router.post('/update', updatePostMiddlewareValidations, update_1.createUpdate);
router.delete('/update/:id', update_1.deleteUpdate);
router.get('/updatepoints', function () { });
router.get('/updatepoints/:id', function () { });
var pointsPutMiddlewareValidations = [
    (0, express_validator_1.body)(['name', 'description']).isString().optional(),
    (0, express_validator_1.body)('updatedAt').isDate(),
    middleware_1.handleInputErrors
];
router.put('/updatepoints/:id', pointsPutMiddlewareValidations, function () { });
var pointsPOSTMiddlewareValidations = [
    (0, express_validator_1.body)(['name', 'description']).isString().exists(),
    (0, express_validator_1.body)('updatedAt').isDate(),
    middleware_1.handleInputErrors
];
router.post('/updatepoints', pointsPOSTMiddlewareValidations, function () { });
router.delete('/updatepoints/:id', function () { });
exports.default = router;
