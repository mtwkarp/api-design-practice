import {Router} from 'express'


const router = Router()
//PRODUCT
router.get('/product', (req, res) => {
    res.json({message: 'kjhvjhgv'})
})
router.get('/product/:id', () => {})
router.put('/product/:id', () => {})
//create product
router.post('/product', () => {})
router.delete('/product/:id', () => {})

//UPDATE

router.get('/update', () => {})
router.get('/update/:id', () => {})
router.put('/update/:id', () => {})
//create update
router.post('/update', () => {})
router.delete('/update/:id', () => {})

//UPDATE POINTS

router.get('/updatepoints', () => {})
router.get('/updatepoints/:id', () => {})
router.put('/updatepoints/:id', () => {})
//create updatepoints
router.post('/updatepoints', () => {})
router.delete('/updatepoints/:id', () => {})

export default router