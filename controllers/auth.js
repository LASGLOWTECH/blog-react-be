
// const db =require('../db')
// import { format } from 'mysql'
const db = require('../db.js')
const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require('dotenv').config();
const register = (req, res) => {

    const q = "SELECT * FROM users WHERE email=? OR username= ?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("user alresdy exist!");


        // harshing th e password
        const saltRounds = 10;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`, `email`,`password`) VALUES (?)";
        const values = [req.body.username, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            
            return res.status(200).json("user created");
        });

    });
}

// login routes

const login = (req, res) => {

    const q = "SELECT * FROM users WHERE username= ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("user does not exist");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) return res.status(400).json("wrong username or password");

        const token = jwt.sign({ id: data[0].id }, "jwt-secretekey");
        console.log(jwt);

        const { password, ...other } = data[0]
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(other);
    });


}

const logout = (req, res) => {
res.clearCookie("access_token", {
    sameSite:"none",
    secure:true
}).status(200).json("user logout")
   
}


module.exports = {
    register, login, logout


}
