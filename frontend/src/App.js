import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import OpenScreen from './screens/OpenScreen';
import UserLoginScreen from './screens/UserLoginScreen';
function App() {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/" component={OpenScreen} exact />
					<Route path="/login" component={UserLoginScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
