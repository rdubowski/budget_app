import { Container } from 'react-bootstrap';
import { HashRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import OpenScreen from './screens/OpenScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import AccountListScreen from './screens/AccountListScreen';
import AccountAddScreen from './screens/AccountAddScreen';
import TrackerScreen from './screens/TrackerScreen';
function App() {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/" component={OpenScreen} exact />
					<Route path="/login" component={LoginScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/accounts/:id/tracker" component={TrackerScreen} />
					<Route path="/accounts" component={AccountListScreen} exact />
					<Route path="/accounts/add" component={AccountAddScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
