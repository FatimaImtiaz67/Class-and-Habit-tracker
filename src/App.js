import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDialogStore } from './stores/dialogStore';

// Pages
import MainPage from './components/MainPage';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import Modal from './components/Modal';
import Dialog from './components/Containment/Dialog';

// Hooks
import useColorScheme from './hooks/useColorScheme';
import useAchievementsCheck from './hooks/useAchievementsCheck';

// DB
import dbModalRoutes from './db/dbModalRoutes';

const PUBLIC_URL = process.env.PUBLIC_URL;

function App() {
	const location = useLocation();
	const isDialogVisible = useDialogStore((s) => s.isVisible);

	useColorScheme();
	useAchievementsCheck();

	return (
		<main className="App">
			<AnimatePresence initial={false}>
				<Routes location={location} key={location.pathname}>
					{/* Auth Routes */}
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />

					{/* Main App Routes */}
					<Route path="/MainPage" element={<MainPage />} />
					<Route path="/" element={<Navigate to="/signin" />} />
					<Route path="*" element={<Navigate to="/signin" />} />

					<Route path={`${PUBLIC_URL}/modal`} element={<Modal />}>
						{dbModalRoutes.map((r) => (
							<Route key={r.path} path={r.path} element={r.element} />
						))}
					</Route>
				</Routes>

				{isDialogVisible && <Dialog key="dialog" />}
			</AnimatePresence>
		</main>
	);
}

export default App;
