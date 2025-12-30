import * as promptController from '../controllers/promptController';
import { Router } from 'express';
import { accessibility, protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/ask', protect, promptController.askAI);

router.get('/history', protect,promptController.getUserPromptsHandler);

router.get('/admin/allHistory',protect, accessibility('admin'),promptController.getAllUsersHistory);
export default router;