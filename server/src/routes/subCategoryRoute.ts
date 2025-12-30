import { Router } from 'express';
import * as subCategoryController from '../controllers/subCategoryController';

const router = Router();

router.post('/addSub', subCategoryController.addSubCategory);

router.get('/getSubsByCatId/:categoryId', subCategoryController.getSubsByCategoryId);

export default router;