import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
function Header() {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const dispatch = useDispatch();
	const history = useHistory();

	const logoutHandler = () => {
		dispatch(logout());
		history.push('/');
	};
	return (
		<header>
			<Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to={userInfo ? '/accounts' : '/'}>
						<Navbar.Brand>Yourbudget</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							{!userInfo && (
								<LinkContainer to="/register">
									<Nav.Link>
										<i className="fas fa-home" /> Register
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && (
								<LinkContainer to="/accounts">
									<Nav.Link>
										<i className="fas fa-credit-card" /> Accounts
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo ? (
								<NavDropdown id={userInfo.name} title={userInfo.name}>
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user" /> Login
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
