import styles from '../css/Header.module.css';

// router
import { Link, useNavigate } from 'react-router-dom';

// components
import IconButton from './Actions/IconButton';

// icons
import { FaPlus, FaBars, FaAward } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { useState } from 'react';

const publicUrl = process.env.PUBLIC_URL;

function Header() {
	const [showDropdown, setShowDropdown] = useState(false);
	const navigate = useNavigate();

	const handleCreateClick = () => {
		setShowDropdown((prev) => !prev);
	};

	const handleNav = (path, title) => {
		setShowDropdown(false);
		navigate(publicUrl + path, { state: { modalTitle: title } });
	};

	const navItems = [
		['/modal/diary', 'Main Diary', <MdLibraryBooks />],
		['/modal/achievements', 'Achievements', <FaAward />],
		['/modal/menu', 'Menu', <FaBars />],
	].map(
		([path, title, icon]) => (
			<li key={path}>
				<Link to={publicUrl + path} state={{ modalTitle: title }}>
					<IconButton {...{ icon, title }} />
				</Link>
			</li>
		)
	);

	return (
		<header className={styles.header}>
			<div className={styles.logoWrapper}>
				<span className={styles.logo} />
				<h1>Rhythmix</h1>
			</div>

			<nav>
				<ul className={styles.navList}>
					<li className={styles.dropdownWrapper}>
						<IconButton icon={<FaPlus />} title="Create" onClick={handleCreateClick} />
						{showDropdown && (
							<div className={styles.dropdownMenu}>
								<button onClick={() => handleNav('/modal/habitEditor', 'Create new habit')}>
									📅 Habit
								</button>
								<button onClick={() => handleNav('/modal/classCreator', 'Create new class')}>
									📘 Class
								</button>
							</div>
						)}
					</li>
					{navItems}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
