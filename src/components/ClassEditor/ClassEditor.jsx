// src/components/ClassEditor/ClassEditor.jsx
import styles from '../../css/HabitEditor.module.css'; // Reusing HabitEditor styles

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// stores
import { useClassesStore } from '../../stores/classStore';

// components
import ClassTitleBlock from './ClassTitleBlock';
import ClassScheduleBlock from './ClassScheduleBlock';
import ClassCodeBlock from './ClassCodeBlock';
import ClassColorBlock from './ClassColorBlock';
import ClassIconBlock from './ClassIconBlock';
import Button from '../Button';
import { generateRandomCode } from '../../utils/codeUtils';

// icons
import { MdAddToPhotos } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';

function ClassEditor() {
	const location = useLocation();
	const navigate = useNavigate();

	const classes = useClassesStore((s) => s.classes);
	const dispatch = useClassesStore((s) => s.classesDispatch);

	const classCodeFromState = location.state?.classCode;
	const isEditMode = Boolean(classCodeFromState);

	const currentClass = isEditMode
		? classes.find((cls) => cls.code === classCodeFromState)
		: null;

	const [title, setTitle] = useState(currentClass?.title || '');
	const [schedule, setSchedule] = useState(currentClass?.schedule || []);
	const [code, setCode] = useState(currentClass?.code || generateRandomCode());
	const [icon, setIcon] = useState(currentClass?.iconTitle || '📘');
	const [colorIndex, setColorIndex] = useState(currentClass?.colorIndex ?? 0);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!title.trim() || !code.trim()) {
			console.warn("Title or Class Code missing");
			return;
		}

		const newData = {
			title: title.trim(),
			code: code.trim(),
			iconTitle: icon,
			colorIndex: colorIndex,
			schedule: schedule || [],
			...(isEditMode && { id: currentClass.id }),
		};

		dispatch({
			type: isEditMode ? 'editClass' : 'addClass',
			data: newData,
		});

		navigate(-1);
	};

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this class?")) {
			dispatch({ type: 'deleteClass', classCode: code });
			navigate(-1);
		}
	};

	const handleArchive = () => {
		if (window.confirm("Archive this class?")) {
			dispatch({ type: 'archiveClass', classCode: code });
			navigate(-1);
		}
	};

	const handleEnter = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.target.blur();
		}
	};

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit} onKeyDown={handleEnter}>
				<ClassTitleBlock input={title} onChange={setTitle} />
				<ClassScheduleBlock schedule={schedule} setSchedule={setSchedule} />
				<ClassCodeBlock code={code} setCode={setCode} />
				<ClassColorBlock
					habits={classes}
					currentColorIndex={colorIndex}
					setColorIndex={setColorIndex}
				/>
				<ClassIconBlock
					habits={classes}
					currentIconTitle={icon}
					setIcon={setIcon}
				/>

				<small className={styles.info}>
					Colors and icons help visually distinguish classes and can be reused.
				</small>

				<div className={styles.btnsWrapper}>
					{isEditMode && (
						<div className={styles.extraBtnsWrapper}>
							<Button
								icon={<MdDeleteForever />}
								text="Delete Class"
								color="IndianRed"
								bgColor="var(--bg-color-primary)"
								onClick={handleDelete}
							/>
							<Button
								icon={<HiArchiveBoxArrowDown />}
								text="Archive Class"
								bgColor="var(--bg-color-primary)"
								onClick={handleArchive}
							/>
						</div>
					)}

					<Button
						type="submit"
						icon={<MdAddToPhotos />}
						text={isEditMode ? "Save Changes" : "Create Class"}
						color="#e6e6e6"
					/>
				</div>
			</form>
		</div>
	);
}

export default ClassEditor;
