import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/broadcast', authMiddleware['admin'], async (req, res) => {

})

export const broadcastRouter = router;