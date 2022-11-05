import { Router } from  "express";

import * as CategoriesController from "../controller/CategoriesController.js";

const router = Router();

//handle requests to /categories

router.delete("/:id", CategoriesController.deleteCategory);


export default router; 