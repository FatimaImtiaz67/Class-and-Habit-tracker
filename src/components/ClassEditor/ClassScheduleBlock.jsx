import styles from '../../css/FrequencyBlock.module.css';
import { useState } from 'react';

function ClassScheduleBlock({ currentSchedule, onChange }) {
	const [schedule, setSchedule] = useState(currentSchedule || '');

	// const handleInputChange = (e) => {
	// 	setSchedule(e.target.value);
	// 	onChange(e.target.value);
	// };

	return (
		<section>
			<div className={styles.header}>
				<h3>Schedule</h3>
			</div>
			<input
				type="text"
				name="schedule"
				id="schedule"
				style={{
		width: '100%',
		padding: '10px',
		fontSize: '1rem',
		border: '1px solid gray',
		borderRadius: '8px',
		boxSizing: 'border-box',
	}}
				value={schedule}
				onChange={(e) => setSchedule(e.target.value)}
				placeholder="e.g. Mon-Wed-Fri 10AM"
			/>
		</section>
	);
}

export default ClassScheduleBlock;