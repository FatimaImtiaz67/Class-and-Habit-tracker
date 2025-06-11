import styles from '../css/MainPage.module.css';

// framer
import { motion } from 'framer-motion';

// components
import Header from './Header';
import HabitList from './HabitList';
import ClassList from './ClassList'; // ✅ ADD THIS
import Placeholder from './Placeholder';

// icons
import { ReactComponent as Calendar } from '../img/calendar.svg';
import { MdAddToPhotos, MdClass } from "react-icons/md";

// stores
import { useHabitsStore } from '../stores/habitsStore';
import { useClassesStore } from '../stores/classStore'; // ✅ ADD THIS

const mainVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: .3, ease: 'easeOut' }
};

function MainPage() {
	const habits = useHabitsStore((s) => s.habits);
	const filteredHabits = habits.filter((h) => !h.isArchived);

	const classes = useClassesStore((s) => s.classes); // ✅
	const joinedClasses = classes.filter((c) => !c.archived); // ✅

	return (
		<motion.div className={styles.mainPage} {...mainVariants}>
			<Header />

			{/* Habits List */}
			<h2 className={styles.sectionHeader}>Habits</h2>
			<HabitList habits={filteredHabits} />
            <h2 className={styles.sectionHeader}>Classes</h2>
			{/* Classes List */}
			<ClassList /> {/* ✅ This displays joined classes */}

			{/* Placeholders */}
			{filteredHabits.length === 0 && joinedClasses.length === 0 && (
				<div className={styles.placeholdersWrapper}>
					<Placeholder
						image={<Calendar />}
						title="No active habits found"
						desc="Why not create one now?"
						textOnButton="Create First Habit"
						buttonIcon={<MdAddToPhotos />}
						to={`${process.env.PUBLIC_URL}/modal/habitEditor`}
						state={{ modalTitle: 'Create new habit' }}
					/>

					<Placeholder
						image={<Calendar />}
						title="No class scheduled"
						desc="You can create or join a class"
						textOnButton="Create New Class"
						buttonIcon={<MdClass />}
						to={`${process.env.PUBLIC_URL}/modal/classCreator`}
						state={{ modalTitle: 'Create new class' }}
					/>
				</div>
			)}
		</motion.div>
	);
}

export default MainPage;
