// src/components/ClassItem.jsx

import styles from '../css/ClassItem.module.css';
import Calendar from './Habit/Calendar';
import CompactCalendar from './Habit/CompactCalendar';
import dbIcons from '../db/dbIcons';
import { useSettingsStore } from '../stores/settingsStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function ClassItem({ cls }) {
	const navigate = useNavigate();
	const settings = useSettingsStore((s) => s.settings);
	if (!cls) return null;

	
	const {
		code = 'N/A',
		title = 'Untitled Class',
		iconTitle = '📘',
		colorIndex = 0,
	} = cls;


	function getIconComponent(iconTitle) {
		for (const entry of dbIcons) {
			if (Array.isArray(entry) && entry[0] === iconTitle) return entry[1];
		}
		return '❓'; // fallback
	}

	// ✅ Get actual icon component
	const icon = getIconComponent(iconTitle);

	const handleClick = () => {
		navigate(`${process.env.PUBLIC_URL}/class/${code}`, {
			state: { classCode: code },
		});
	};



	const calendar = (
		settings.calendarView === 'compact' ? (
			<CompactCalendar colorPalette={{}} completedDays={[]} frequency={{}} />
		) : (
			<Calendar colorPalette={{}} completedDays={[]} frequency={{}} />
		)
	);

	return (
		<motion.div
			className={styles.classItem}
			whileTap={{ scale: 0.97 }}
			onClick={handleClick}
		>
			<div
				className={styles.icon}
				style={{ backgroundColor: `var(--color-${colorIndex})` }}
			>
				{icon}
			</div>

			<div className={styles.textContent}>
				<h3>{title}</h3>
				<p className={styles.meta}>{code}</p>
			</div>
			<div className={styles.calendarWrapper}>
				{calendar}
			</div>
		</motion.div>
	);
}

export default ClassItem;
