import styles from '../../css/Menu.module.css';
import packageJson from '../../../package.json';

// components
import MenuItemList from './MenuItemList';
import MenuItem from './MenuItem';

import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
// Adjust the path if needed

// utils
import clearLocalStorage from '../../utils/clearLocalStorage';

// icons
import { BsFillDatabaseFill } from "react-icons/bs";
import { FaGithub, FaPaintBrush } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { ImFire } from "react-icons/im";
import { HiArchiveBox } from "react-icons/hi2";

const PUBLIC_URL = process.env.PUBLIC_URL;

function Menu() {
	const navigate = useNavigate();

	const handleLogout = () => {
		signOut(auth).then(() => {
			clearLocalStorage(PUBLIC_URL); // Optional: Clears app data
			navigate('/signin');
		});
	};

	return (
		<section className={styles.menu}>
			<MenuItemList title="App">
				<MenuItem
					icon={<HiArchiveBox />}
					iconColor="#7b68ee"
					title="Archive"
					desc="View or manage archived habits"
					to={`${PUBLIC_URL}/modal/archive`}
					state={{ modalTitle: 'Archive' }}
					arrow
				/>

				<MenuItem
					icon={<FaPaintBrush />}
					iconColor="#ffa420"
					title="Appearance"
					desc="Customize the app's look"
					to={`${PUBLIC_URL}/modal/appearance`}
					state={{ modalTitle: 'Appearance' }}
					arrow
				/>

				<MenuItem
					icon={<BsFillDatabaseFill />}
					iconColor="#77dd77"
					title="Export / Import Data"
					desc="Backup or restore your data"
					to={`${PUBLIC_URL}/modal/dataTransfer`}
					state={{ modalTitle: 'Export/Import Data' }}
					arrow
				/>
			</MenuItemList>

			<MenuItemList title="Other">
				<MenuItem
					icon={<FaGithub />}
					iconColor="#7fc7ff"
					title="GitHub Repository"
					desc="View or contribute to the project"
					onClick={() => window.open('https://github.com/iNikAnn/DoHabit', '_blank')}
					link
				/>

				<MenuItem
					icon={<IoIosMail />}
					iconColor="#ffb841"
					title="Send Feedback"
					desc="Share your thoughts or report an issue"
					onClick={() => window.location.href = 'mailto:ilowen@ya.ru?subject=Feedback%20on%20DoHabit'}
					link
				/>
			</MenuItemList>

			<MenuItemList
				title="Danger Zone"
				titleStyle={{ color: 'IndianRed' }}
				listStyle={{ border: '1px solid IndianRed' }}
			>
				<MenuItem
					icon={<ImFire style={{ color: 'IndianRed' }} />}
					title="Clear Data"
					desc="Delete all application data"
					
				/>
			</MenuItemList>
			<MenuItemList title="Account">
				<MenuItem
					icon={<ImFire style={{ color: 'tomato' }} />}
					iconColor="tomato"
					title="Logout"
					desc="Sign out of your account"
					onClick={handleLogout}
				/>
			</MenuItemList>


			<div className={`${styles.category} ${styles.footer}`}>
				<small>Version: {packageJson.version}</small>
			</div>
		</section>
	);
}

export default Menu;