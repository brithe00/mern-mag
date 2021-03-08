import asyncHandler from 'express-async-handler';
import Article from '../models/articleModel.js';

// @desc    Fetch all articles
// @route   GET /api/articles
// @access  Public
const getArticles = asyncHandler(async (req, res) => {
	const pageSize = 2;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				title: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	const count = await Article.countDocuments({ ...keyword });

	const articles = await Article.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({ articles, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single articles
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = asyncHandler(async (req, res) => {
	const article = await Article.findById(req.params.id);

	if (article) {
		res.json(article);
	} else {
		res.status(404);
		throw new Error('Article not found!');
	}
});

// @desc    Delete an article
// @route   DELETE /api/article/:id
// @access  Private/Admin
const deleteArticle = asyncHandler(async (req, res) => {
	const article = await Article.findById(req.params.id);

	if (article) {
		await article.remove();
		res.json({ message: 'Article removed!' });
	} else {
		res.status(404);
		throw new Error('Article not found!');
	}
});

// @desc    Create an articme
// @route   POST /api/articles/
// @access  Private/Admin
const createArticle = asyncHandler(async (req, res) => {
	const article = new Article({
		image: '/images/sample.jpg',
		title: 'Sample title',
		content: 'Sample content',
		category: 'Sample category',
		numComments: 0,
		author: [{ authorName: req.user.name, authorId: req.user._id }],
	});

	const createdArticle = await article.save();

	res.status(201).json(createdArticle);
});

// @desc    Update an article
// @route   PUT /api/article/:id
// @access  Private/Admin
const updateArticle = asyncHandler(async (req, res) => {
	const { image, title, content, category } = req.body;

	const article = await Article.findById(req.params.id);

	if (article) {
		article.image = image;
		article.title = title;
		article.content = content;
		article.category = category;

		const updatedArticle = await article.save();
		res.json(updatedArticle);
	} else {
		res.status(404);
		throw new Error('Article not found!');
	}
});

// @desc    Create new comment
// @route   POST /api/products/:id/comments
// @access  Private
const createArticleComment = asyncHandler(async (req, res) => {
	const { comment } = req.body;

	const article = await Article.findById(req.params.id);

	if (article) {
		const alreadyCommented = article.comments.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyCommented) {
			res.status(400);
			throw new Error('Article already commented!');
		}

		const review = {
			name: req.user.name,
			comment,
			user: req.user.id,
		};

		article.comments.push(review);

		article.numComments = article.comments.length;

		await article.save();
		res.status(201).json({ message: 'Comment added!' });
	} else {
		res.status(404);
		throw new Error('Article not found!');
	}
});

// @desc    Get my articles
// @route   GET /api/articles/myarticles
// @access  Private
const getMyArticles = asyncHandler(async (req, res) => {
	const articles = await Article.find({
		'author.authorId': req.user._id,
	});

	res.json(articles);
});

export {
	getArticles,
	getArticleById,
	deleteArticle,
	createArticle,
	updateArticle,
	createArticleComment,
	getMyArticles,
};
