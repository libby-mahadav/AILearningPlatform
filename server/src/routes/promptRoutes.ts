import { Router } from 'express';
import * as promptController from '../controllers/promptController';
import { validate } from '../middlewares/validationMiddleware';
import { askAISchema } from '../utils/validators';
import { accessibility, protect } from '../middlewares/authMiddleware';

const router = Router();
router.post('/ask', protect, validate(askAISchema), promptController.askAI);
router.get('/history', protect, promptController.getUserPromptsHandler);
router.get('/admin/allHistory', protect, accessibility('admin'), promptController.getAllUsersHistory);
export default router;