
// const db =require('../db')
// import { format } from 'mysql'
const  db = require( '../db.js')
const express = require('express')
const bcrypt = require('bcrypt');

const register = (req, res) => {

    const q = "SELECT * FROM users WHERE email=? OR username= ?"

    db.query(q, [req.body.eamal, req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("user alresdy exist!");


        // harshing th e password
        const saltRounds = 10;
       
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        const q = "INSERT INTO users(`username`, `email`,`password`) VALUES (?)";
   const values=[req.body.username, req.body.email, hash];

   db.query(q, [values], (err,data)=>{
    if (err) return res.json(err);
    return res.status(200).json("user created");
   });
  
    });
}

const login = (req, res) => {

    res.json("Login here")
}

const logout = (req, res) => {

    res.json("Logout here")
}


module.exports = {
    register, login, logout


}
