import { Router } from 'express';
import * as subCategoryController from '../controllers/subCategoryController';

const router = Router();

router.post('/', subCategoryController.addSubCategory);

export default router;