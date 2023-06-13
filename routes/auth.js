const express = require('express');
const User = require('../models/user');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const JWT = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "Ru$#!T-Le@D";

router.post('/createuser', [
    body('name','Enter a valid name').isLength({ min: 2 }),
    body('phone','Enter a valid phone number').isLength({min:10, max:10}),
    body('password','Enter a valid password').isLength({ min: 3 })
] ,async (req,res)=> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        });
    }
    try {

        let checkUser = await User.findOne({ phone: req.body.phone });

        if (checkUser) {
            return res.status(400).json({
                error: 'Please enter a unique phone number.'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        let user = await User.create({
            name: req.body.name,
            phone: req.body.phone,
            joiningDate: Date('21-09-2201'),
            password: secPass,
        });

        const JWT_Data = {
            user: {
                id: user.id
            }
        }

        const token = JWT.sign(JWT_Data,JWT_SECRET);

        res.send({token});

    } catch (error) {
        res.status(400).send(`Internal server error => ${error}`)
    }
});


router.post('/login', [
    body('number','Enter a valid phone number').isLength({max:10}),
    body('password','Enter a valid password').isLength({min:3}),
], async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        });
    }
    try {
        let checkUser = await User.findOne({ phone: req.body.phone });

        if (!checkUser) {
            return res.status(400).json({
                error: 'Please login with correct credential.'
            });
        } 
        
        const verifyPass = await bcrypt.compare(req.body.password,checkUser.password);
        
        if (!verifyPass) {
            return res.status(400).json({
                error: 'Please login with correct credential.'
            });
        } 

        const JWT_Data = {
            user: {
                id: checkUser.id
            }
        }

        const token = JWT.sign(JWT_Data,JWT_SECRET);

        res.json({token});
        
    } catch (error) {
        res.status(400).send(`Internal server error => ${error}`)
    }
});

router.post('/getuser', fetchuser, async (req,res) => {
    
    try {
        const user = await User.findById(req.userId.id).select('-password');
        res.send(user);
    } catch (error) {
        res.status(400).send(`Internal server error => ${error}`)
    }
});

module.exports = router;