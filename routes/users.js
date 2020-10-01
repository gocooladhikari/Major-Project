const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

//DB model
const User = require('../models/User')
const Product = require('../models/Product')


router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

// router.get('/adminhome', (req, res) => {
//     res.render('adminhome', {title: 'Admin Home'})
// })

router.post('/register', (req, res) => {
    const username = req.body.username
    const password1 = req.body.password1
    const password2 = req.body.password2
           
        const newUser = new User({
            username: username,
            password: password1
        })

        newUser.save().then(user => {
            res.redirect('/user/login')
        }).catch(err => console.log(err)) 
})


// POST login route
router.route('/login').post(passport.authenticate('local'), (req, res) => {
    res.redirect('/new')
    console.log(req.user)
})

router.route('/logout').get((req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router