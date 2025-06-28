import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { broadcastModel } from '../db.js';
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
        const { role } = req.user;
        const giveBroadcast = await broadcastModel.find({ role }).sort({ createdAt: -1 });

        if (!giveBroadcast) return res.status(204).send();
        console.log(giveBroadcast);
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

export const broadcastRouter = router;