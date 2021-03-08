import React from 'react';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Article = ({ article }) => {
	return (
		<>
			<Row className="my-4 align-items-center">
				<Col md={4}>
					<Image src={article.image} alt={article.title} fluid />
				</Col>
				<Col md={4}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{article.title}</h3>
						</ListGroup.Item>
						<ListGroup.Item>{article.category}</ListGroup.Item>
						<ListGroup.Item>
							{article.createdAt.substring(0, 10)} by{' '}
							{article.author[0].authorName}
						</ListGroup.Item>
						<ListGroup.Item>
							<Link to={`/article/${article._id}`}>Read article</Link>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default Article;
