import styles from '../../css/IconBlock.module.css';
import { useState } from 'react';
import dbIcons from '../../db/dbIcons';

function ClassIconBlock({ classes = [], currentIconTitle, setIcon }) {
	const [showMore, setShowMore] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState(currentIconTitle || 'default');

	const currentIconIndex = dbIcons.findIndex((el) => Array.isArray(el) && el[0] === currentIconTitle);

	const iconList = [
		<input
			key="selectedIcon"
			type="hidden"
			name="iconTitle"
			id="iconTitle"
			value={selectedIcon}
			readOnly
		/>
	];

	const count = showMore ? dbIcons.length : 14;

	for (let index = 0; index < count; index++) {
		if (typeof dbIcons[index] === 'string') {
			iconList.push(
				<div key={dbIcons[index]} className={styles.iconCategory}>
					<small>{dbIcons[index]}</small>
				</div>
			);
			continue;
		}

		const [iconTitle, icon] = dbIcons[index];
		const isIconUsed = classes.find((cls) => cls.iconTitle === iconTitle);

		iconList.push(
			<label key={iconTitle} style={{ transform: isIconUsed ? 'scale(0.75)' : '' }}>
				<input
					type="radio"
					name="icon"
					id={iconTitle}
					value={iconTitle}
					onChange={(e) => {
						setSelectedIcon(e.target.value);
						setIcon(e.target.value); 
					}}
					defaultChecked={index === currentIconIndex || (!currentIconTitle && !index)}
				/>
				<div className={styles.iconBg} />
				{icon}
			</label>
		);
	}


	return (
		<section>
			<div className={styles.header}>
				<h3>Icon</h3>
				<button type='button' className='text-button' onClick={() => setShowMore((state) => !state)}>
					{'Show ' + (showMore ? 'less' : 'more')}
				</button>
			</div>
			<div className={styles.iconList}>{iconList}</div>
		</section>
	);
}

export default ClassIconBlock;
