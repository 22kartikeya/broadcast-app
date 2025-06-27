import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../db.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { secrets } from '../config.js';
const router = Router();

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
            email: existingUser.email,
            role: existingUser.role
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
router.get('/profile', authMiddleware() ,async (req, res) => {
    const { email, role } = req.user;
    switch (role) {
        case 'admin':
            return res.json({
                role,
                email,
                dashboard: 'Welcome to the Admin Dashboard',
                features: ['BroadcastingDashboard']
            });

        case 'employee':
            return res.json({
                role,
                email,
                dashboard: 'Welcome to the Employee Dashboard',
                features: ['EmployeeDashboard']
            });

        case 'user':
            return res.json({
                role,
                email,
                dashboard: 'Welcome to the User Dashboard',
                features: ['UserDashboard']
            });
        default:
            return res.status(400).json({ error: 'Invalid role in token' });
    }
});

// logout route
router.get('/logout', async (req, res) => {

})


export const userRouter = router;