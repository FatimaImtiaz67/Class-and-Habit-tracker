// src/components/ClassScheduler.jsx

import styles from '../../css/Habit.module.css'; // Reusing same styles

// react
import { useRef, useState } from 'react';

// framer
import { motion } from 'framer-motion';

// utils or mock helpers
import getColorPalette from '../../utils/getColorPalette'; // Optional, if you use class colors

function ClassScheduler({ classData, onOpenMenu }) {
	const classRef = useRef(null);
	const [isMenuVisible, setMenuVisible] = useState(false);

	const colorPalette = getColorPalette('blue'); // or from classData.color

	const handleClick = () => {
		setMenuVisible(true);
		onOpenMenu?.();
	};

	return (
		<motion.div
			ref={classRef}
			className={styles.habit} // Reusing same container style
			layout
			onClick={handleClick}
		>
			{/* === Header === */}
			<div className={styles.header}>
				<h3 style={{ color: colorPalette.primary }}>{classData.title}</h3>
				<p className={styles.subtext}>Instructor: {classData.ownerName}</p>
			</div>

			{/* === Content === */}
			<div className={styles.content}>
				<p>Schedule: {classData.schedule}</p>
				<p>Class Code: {classData.code}</p>
				<p>Members: {classData.members?.length || 0}</p>
			</div>

			{/* === Optional Menu or Actions === */}
			{isMenuVisible && (
				<div className={styles.menu}>
					<button onClick={() => alert('Join class feature coming soon!')}>Join</button>
					<button onClick={() => setMenuVisible(false)}>Close</button>
				</div>
			)}
		</motion.div>
	);
}

export default ClassScheduler;
