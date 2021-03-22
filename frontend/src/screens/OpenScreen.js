import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Jumbotron, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
function OpenScreen() {
	return (
		<div>
			<Row>
				<Col md={4} />
				<Col>
					<Image className="img" src="./flame-payment-processed.svg" fluid />
				</Col>
				<Col md={4} />
			</Row>
			<Row>
				<Col md={4} />
				<Col>
					<h1 className="text-center">Your budget!!!</h1>
					<p>
						This is a simple app to manage your budget. To use it you have to register or if you registered
						user, log in.
					</p>
				</Col>
				<Col md={4} />
			</Row>

			<Row>
				<Col md={4} />
				<Col md={2} className="text-center">
					<Link to={'/register'}>
						<Button variant="secondary">Register</Button>
					</Link>
				</Col>
				<Col md={2} className="text-center">
					<Link to={'/login'}>
						<Button variant="secondary">Login</Button>
					</Link>
				</Col>
				<Col md={4} />
			</Row>
		</div>
	);
}

export default OpenScreen;
