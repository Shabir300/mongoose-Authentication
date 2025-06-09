import userModel from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const registerUser = expressAsyncHandler(async(req, res) => {
    // user would have provided name, email and password
    // first let's check if an account already exists with given email 
    const {name, email, password} = req.body;
    const existingUser = await userModel.findOne({email});
    // console.log('existing user check', existingUser);
    // if no exisitng account then proceed to registeration 
    if (!existingUser) {
        // hash the password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
        
        // now create/register the user in the db
        const createdUser = await userModel.create({
            name,
            email,
            password: hash,
        });

        // now after registeration we would give back a token with userId in res cookie with httpOnly
        if (createdUser) {  
            const token = jwt.sign({userId: createdUser._id}, 'abc123abc');
            res.status(201);
            res.cookie('userToken', token, {
                httpOnly: true,
            });
        } else {
            throw new Error('New user cannot be register right now, try again later!');
        }
    } else {
        res.status(404);
        throw new Error('User already exists, log in!')
    }

    
});

export const loginUser = expressAsyncHandler(async(req, res) => {
    res.status(200).json('here we go')
});

export const getMe = expressAsyncHandler(async(req, res) => {
    res.status(200).json('here we go')
});

export const getUsers = expressAsyncHandler(async(req, res) => {
    const users = await userModel.find();
    res.status(200).json(users)
});
