import { Router } from 'express';
import * as subCategoryController from '../controllers/subCategoryController';

const router = Router();
router.post('/addSub', subCategoryController.addSubCategory);
router.get('/:categoryId', subCategoryController.getAllSubsByCategoryId);
export default router;