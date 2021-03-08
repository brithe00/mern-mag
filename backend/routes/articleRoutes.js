import express from 'express';
const router = express.Router();
import {
	getArticles,
	getArticleById,
	deleteArticle,
	createArticle,
	updateArticle,
	createArticleComment,
	getMyArticles,
} from '../controllers/articleController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getArticles).post(protect, admin, createArticle);
router.route('/myarticles').get(protect, getMyArticles);
router
	.route('/:id')
	.get(getArticleById)
	.delete(protect, admin, deleteArticle)
	.put(protect, admin, updateArticle);
router.route('/:id/comments').post(protect, createArticleComment);

export default router;
