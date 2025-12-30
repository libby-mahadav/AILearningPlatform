import * as promptController from '../controllers/promptController';
import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/ask', protect, promptController.askAI);

router.get('/history', protect,promptController.getUserPromptsHandler);

router.get('/admin/allHistory', protect, promptController.getAllUsersHistory);

export default router;