import * as promptController from '../controllers/promptController';
import { Router } from 'express';

const router = Router();

router.post('/', promptController.newPrompt);

export default router;