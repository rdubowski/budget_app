import React from 'react';
import { Container, Row, Col, Image, Jumbotron, Button } from 'react-bootstrap';

function OpenScreen() {
	return (
		<Jumbotron>
			<Row>
				<Col md={4} />
				<Col>
					<Image className="img" src="./flame-payment-processed.svg" fluid />
				</Col>
				<Col md={4} />
			</Row>
			<h1>Hello, world!</h1>
			<p>
				This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured
				content or information.
			</p>
			<Row>
				<Col md={4} />
				<Col md={2} className="text-center">
					<Button variant="secondary">Register</Button>
				</Col>
				<Col md={2} className="text-center">
					<Button variant="secondary">Login</Button>
				</Col>
				<Col md={4} />
			</Row>
		</Jumbotron>
	);
}

export default OpenScreen;
