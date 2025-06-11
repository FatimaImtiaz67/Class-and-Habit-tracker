// src/components/ClassesScheduler/ClassList.jsx

import styles from '../css/HabitList.module.css';
import { useClassesStore } from '../stores/classStore';
import ClassItem from './ClassItem';
import EmptyState from './EmptyState';

function ClassList() {
	const classes = useClassesStore((s) => s.classes);
	const joinedClasses = classes.filter(cls => !cls.isArchived); // FIXED

	if (joinedClasses.length === 0) {
		return (
			<EmptyState
				title="No Classes Joined"
				// description="Join or create a class to get started."
			/>
		);
	}

	return (
		<div className={styles.classGrid}>
			{joinedClasses.map((cls) => (
				<ClassItem key={cls.code} cls={cls} /> 
			))}
		</div>
	);
}

export default ClassList;
