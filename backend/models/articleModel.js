import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		comment: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const authorSchema = mongoose.Schema({
	authorName: { type: String, required: true },
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

const articleSchema = mongoose.Schema(
	{
		image: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: Object,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		numComments: {
			type: Number,
			required: true,
			default: 0,
		},
		author: [authorSchema],
		comments: [commentSchema],
	},
	{ timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
