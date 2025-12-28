import * as promptController from '../controllers/promptController';
import { Router } from 'express';

const router = Router();

router.post('newPrompt', promptController.newPrompt);

export default router;