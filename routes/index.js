const router = require('express').Router()
const multer = require('multer')
const Product = require('../models/Product')


// app.use(express.static(__dirname + '/public'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilter
})

router.route('/').get((req, res) => {
    
    Product.find().then(posts => {

        if(req.isAuthenticated()){
            res.render('index', {user: req.user, posts})
        }else{
            res.render('index', {user: null, posts})
        }  
    }).catch(err => console.log(err))
    
})



router.route('/product/:id/details').get((req, res) => {
    Product.findById(req.params.id).then(post => {
        // res.render('single-product')
        Product.find({category: post.category}).then(posts => {
            // console.log(posts)

            if(req.isAuthenticated()){
                res.render('single-product', {user: req.user, post, posts})
            }else{
                res.render('single-product', {user: null, post, posts})
            } 
        })
        
    }).catch(err => console.log(err))
})

// Display all products
router.route('/all').get((req, res) => {
    
    Product.find().then(posts => {
        res.render('shop', {posts})
    }).catch(err => console.log(err))
})

router.route('/cart').get((req, res) => {
    res.render('checkout')
})

router.route('/register').get((req, res) => {
    res.render('register')
})

router.route('/new').get((req, res) => {
    res.render('addnew')
})

// Post a new product
router.route('/product/new').post(upload.single('image'), (req, res) => {

    console.log(req.body.editor1)
    console.log(req.file)

    const {name, brand, editor1, type, price, category} = req.body
    const image = req.file.path.replace(/\\/g, "/")

    const newproduct = new Product({
        name, brand, description: editor1, type, price, image, category
    })

    newproduct.save().then(product =>{
        console.log(product)
        res.redirect(`/product/${product.id}/details`)
    }).catch(err => console.log(err))
})


// Post a comment
router.route('/product/:id/comment').post((req, res) => {
    console.log(req.body)
    Product.findById(req.params.id).then(post => {
        const comment = {
            user: req.body.user,
            comment: req.body.review
        }

        post.comments.push(comment)
        post.save().then(res.redirect(`/product/${post.id}/details`))
    }).catch(err => console.log(err))
})



module.exports = router