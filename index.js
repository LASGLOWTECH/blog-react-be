const express = require('express')
const cors = require('cors');
const postRoutes = require('./routes/posts.js');

const authRoutes = require('./routes/auth.js');
// const userRoutes = require('./routes/user.js');
// respond with "hello world" when a GET request is made to the homepage

const app = express()
app.use(cors({
    origin: 'http://localhost:5173', // Use your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed HTTP methods
    credentials: true // If you need to include cookies or credentials in the request
}));
app.use(express.json())
      
app.use("/api/posts", postRoutes)
// app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

// app.get('/', (req, res) => {
//     res.send('hello world')
//   })

app.listen('5000', ()=>{
console.log('app listening onn point 5000');

})
 