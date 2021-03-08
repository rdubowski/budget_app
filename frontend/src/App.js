import { Container, Image } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import OpenScreen from './screens/OpenScreen';
function App() {
	return (
		<div>
			<Header />
			<main className="py-3">
				<Container>
					<OpenScreen />
				</Container>
			</main>
			<Footer />
		</div>
	);
}

export default App;
