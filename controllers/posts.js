const express = require('express')
const db = require('../db.js')
const jwt = require('jsonwebtoken');
// get all posts
const getPosts = (req, res) => {

        const q = req.query.cat? " SELECT * FROM posts WHERE cat=?"
                : " SELECT * FROM posts"
        db.query(q, [req.query.cat], (err, data) => {

                if (err) return res.send(err)
                return res.status(200).json(data)
        })
}


// get single post  
  
const getPost = (req, res) => {
        const q = "SELECT `username` , `title`, `descr`, p.img , u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.userid=p.uid WHERE p.postid= ?"
        db.query(q,[req.params.id], (err, data) => {
                if (err) {
                        console.error(err); // Log the error for debugging
                        return res.status(500).send(err);
                }

                if (data.length===0) 
                        {
                        return res.status(404).json({ message: "Post not found" });
                }

                console.log(data[0]); // Log the returned data
                return res.status(200).json(data[0]);

        })


}


const addPost = (req, res) => {

        res.json("Why where you stressing me")
}

const deletePost = (req, res) => {
const token= req.cookies.access_token
if(!token) 
        return res.status.json("your're not authenticated")

       jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if (err)    return res.status(403).json("Token is invalid")
const postid=req.params.id

const q= " DELETE FROM posts WHERE `postid`=? AND `uid`=?"
db.query(q, [postid, userInfo.id], (err, data)=>{
        if (err) return res.status(403).json("you have access to your post only!")
                 
                return res.status(200).json("post deleted")

})
      

       }
      


) 

}

const updatePost = (req, res) => {

        res.json("Why where you stressing me")
}
module.exports = { getPosts, addPost, deletePost, updatePost, getPost }