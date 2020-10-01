const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')

require('./config/passport')(passport)


// DB model
const User = require('./models/User')
const Product = require('./models/Product')

const app = express()



// //DB Config
// mongodb://localhost:27017/Sentiment-Analysis
mongoose.connect('mongodb+srv://gocool:gocool@cluster0.3ujkq.mongodb.net/Major-Proj?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(
  () => console.log('DB connected')
).catch(err => console.log(err))



// BOdy_Paarser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//PUblic directory setup
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))
app.use('/uploads', express.static('./uploads'))
app.use('/uploads', express.static('uploads'))


//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')


//Express sessions
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
)

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// // Global variables
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash('success_msg')
//   res.locals.error_msg = req.flash('error_msg')
//   res.locals.error = req.flash('error')
//   next()
// })


app.use('/', require('./routes/index'))
app.use('/user', require('./routes/users'))
// app.use('/post', require('./routes/post'))
// app.use('/comments', require('./routes/comments'))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('Server connected on port: ' + PORT))