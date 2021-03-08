import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Button,
	Form,
	Container,
} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
	listArticleDetails,
	createArticleReview,
} from '../actions/articleActions';
import { ARTICLE_CREATE_REVIEW_RESET } from '../constants/articleConstant';

import draftToHtml from 'draftjs-to-html';

const ArticleScreen = ({ match }) => {
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const articleDetails = useSelector((state) => state.articleDetails);
	const { loading, error, article } = articleDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const articleReviewCreate = useSelector((state) => state.articleReviewCreate);
	const {
		success: successArticleReview,
		error: errorArticleReview,
	} = articleReviewCreate;

	useEffect(() => {
		if (successArticleReview) {
			alert('Review Submited!');
			setComment('');
			dispatch({ type: ARTICLE_CREATE_REVIEW_RESET });
		}
		dispatch(listArticleDetails(match.params.id));
	}, [dispatch, successArticleReview, match]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createArticleReview(match.params.id, { comment }));
	};

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						<h1 className="mx-auto my-3">{article.title}</h1>
					</Row>
					<Container className="my-3">
						<h4>Category: {article.category}</h4>
						<h4>Date: {article.createdAt}</h4>
					</Container>
					<Image src={article.image} alt={article.title} fluid />
					{article.content && (
						<div
							dangerouslySetInnerHTML={{
								__html: draftToHtml(
									JSON.parse(JSON.stringify(article.content))
								),
							}}
						/>
					)}

					<hr />
					<Row>
						<Col md={6}>
							<h2>Comments</h2>
							{article.comments.length === 0 && (
								<Message variant="info">No Comments</Message>
							)}
							<ListGroup variant="flush">
								{article.comments.map((comment) => (
									<ListGroup.Item key={comment._id}>
										<strong>{comment.name}</strong>
										<p>{comment.createdAt.substring(0, 10)}</p>
										<p>{comment.comment}</p>
									</ListGroup.Item>
								))}

								<ListGroup.Item>
									<h2>Write a comment</h2>
									{errorArticleReview && (
										<Message variant="danger">{errorArticleReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId="comment">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as="textarea"
													row="3"
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button type="submit" variant="primary">
												Submit
											</Button>
										</Form>
									) : (
										<Message variant="info">
											Please <Link to="/login">sign in</Link> to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ArticleScreen;
