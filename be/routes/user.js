import { Router } from 'express';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../db.js';
dotenv.config();
const router = Router();
const secrets = {
    admin: process.env.ADMIN_SECRET,
    usaer: process.env.USER_SECRET,
    employee: process.env.EMPLOYEE_SECRET
}

router.post('/signup', async (req, res) => {
    try{
        const { email, password, role } = req.body;
        if(!email || !password || !role) return res.status(400).json({message: "Field not filled"});
        const existingUser = await userModel.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists"});
        const hashPass = await bcrypt.hash(password, 12);
        const newUser = await userModel.create({
            email, password: hashPass, role
        })
        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email,
            role: newUser.role
        }, secrets[role], {expiresIn: '7hr'});
        res.status(201).json({
            message: "Signup Successfull",
            token
        })
    }catch(e){
        console.log("Signup error: ", e);
        return res.status(500).json({error: "Internal Server Error"});
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Field not filled" });
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) return res.status(403).json({message: "Incorrect Credentials"});
        const passMatch = await bcrypt.compare(password, existingUser.password);
        if (!passMatch) return res.status(403).json({ message: "Incorrect Credentials" });
        const token = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
        }, secrets[existingUser.role], { expiresIn: '7hr' });
        res.status(201).json({
            message: "Login Successfull",
            token
        })
    } catch (e) {
        console.log("Login error:", e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

// profile route
router.get('/profile', async (req, res) => {

})

// logout route
router.get('/logout', async (req, res) => {
    
})


export const userRouter = router;