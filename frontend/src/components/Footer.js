import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">
						Copyright &copy; - MERN Mag -{' '}
						<a href="https://www.github.com/brithe00" target="_blank">
							GitHub
						</a>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
