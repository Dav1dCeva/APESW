import "./Style/global.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home_Principal/HomePage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { ContactPage } from './pages/Home_Principal/ContactarAdminPage';
import { LoginPage } from './pages/Auth/LoginPage';
// import { ContactarAdminPage } from './pages/Home_Principal/ContactarAdminPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/auth/register" element={<RegisterPage />} />
				{/* Agrega más rutas según tus páginas */}
			<Route path="/auth/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
