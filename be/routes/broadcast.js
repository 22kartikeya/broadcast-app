import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { broadcastModel, userModel } from '../db.js';
const router = Router();

router.post('/broadcast', authMiddleware(['admin']), async (req, res) => {
    try{
        const { role, message } = req.body;
        if (!role || !message) return res.status(400).json({ error: "Role and Message is required" });
        if(!['user', 'employee', 'admin'].includes(role)) return res.status(400).json({ error: "Invalid Role" });
        const newMessage = await broadcastModel.create({ role, message });
        return res.status(201).json({ message: "Message sent successfully", newMessage})
    }catch(e){
        console.log("Broadcast error:", e);
        return res.status(500).json({ error: "Internal Server Error" });
    }

})

router.get('/broadcast', authMiddleware(), async (req, res) => {
    try {
        const { role, email } = req.user;
        const user = await userModel.findOne({ email });
        if(!user || user.isBroadcastDisabled) return res.status(204).send();
        const giveBroadcast = await broadcastModel.find({ role }).sort({ createdAt: -1 });

        if (!giveBroadcast) return res.status(204).send();
        return res.status(200).json({
            giveBroadcast: giveBroadcast.map (b => ({
                message: b.message,
                createdAt: b.createdAt
            }))
        });
    } catch (e) {
        console.error('Broadcast fetch error:', e);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/disable-broadcast', authMiddleware(), async (req, res) => {
    try {
        const { email } = req.user;
        await userModel.updateOne({email}, {$set: {isBroadcastDisabled: true}});
        return res.status(200).json({message: "Broadcast is disabled"});
    }catch(e){
        console.log("Disabled broadcast error:", e);
        return res.status(500).json({error: "Internal server error"});
    }
});

export const broadcastRouter = router;