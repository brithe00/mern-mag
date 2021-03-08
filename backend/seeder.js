import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import articles from './data/articles.js';
import User from './models/userModel.js';
import Article from './models/articleModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await User.deleteMany();
		await Article.deleteMany();

		const createdUsers = await User.insertMany(users);

		const adminUser = createdUsers[0]._id;

		const sampleArticles = articles.map((article) => {
			return { ...article, user: adminUser };
		});

		await Article.insertMany(sampleArticles);

		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
} else {
	importData();
}
