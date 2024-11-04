const express = require('express')
const cors = require('cors');
const postRoutes = require('./routes/posts.js');
const cookieParser = require("cookie-parser")
const app = express()
const multer=require ('multer')

 
const authRoutes = require('./routes/auth.js');

app.use(cors({
    origin: 'http://localhost:5173', // Use your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed HTTP methods
    credentials: true // If you need to include cookies or credentials in the request
}));

app.use(express.json())
app.use(cookieParser());

const storage=multer.diskStorage({
    destination: (req, file, cb)=>{
cb(null, '../my-project/public/upload')},

  filename:(req, file, cb)=>{
   
     cb(null,  Date.now() + file.originalname )   
    },
}) 
console.log(storage);


const upload= multer({storage})

app.post('/api/upload', upload.single('file'), (req, res)=>{
    const file= req.file
res.status(200).json(file.filename)
})
   
app.use("/api/posts", postRoutes)
// app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

// app.get('/', (req, res) => {
//     res.send('hello world')
//   })

app.listen('5000', () => {
    console.log('app listening onn point 5000');

})
