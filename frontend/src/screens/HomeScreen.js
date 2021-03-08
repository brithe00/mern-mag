import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Article from '../components/Article';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listArticles } from '../actions/articleActions';
import Paginate from '../components/Paginate';

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;

	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const articleList = useSelector((state) => state.articleList);
	const { loading, error, articles, page, pages } = articleList;

	useEffect(() => {
		dispatch(listArticles(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			{keyword && (
				<Link to="/" className="btn btn-light mb-3">
					Go Back
				</Link>
			)}

			<h1>Latest articles</h1>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					{articles.map((article) => (
						<Col key={article._id} sm={12} ld={4} wl={3}>
							<Article article={article} />
						</Col>
					))}
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
