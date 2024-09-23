
const express = require('express')
const router= express.Router();
const {
 register,
 login, 
 logout
} = require('../controllers/auth')

// GET method route

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
// app.get('/', (req, res) => {
//     res.send('GET request to the homepage')
//   })
  
  // POST method route
  // app.post('/', (req, res) => {
  //   res.send('POST request to the homepage')

    
  // })

  module.exports = router