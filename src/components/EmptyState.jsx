// src/components/EmptyState.jsx

import styles from '../css/EmptyState.module.css';
import { Link } from 'react-router-dom';

function EmptyState({ image, title, desc, textOnButton, buttonIcon, to, state }) {
	return (
		<div className={styles.emptyState}>
			<div className={styles.imageWrapper}>
				{image}
			</div>
			<h2>{title}</h2>
			<p>{desc}</p>

			<Link
				to={to}
				state={state}
				className={styles.btn}
			>
				{buttonIcon}
				<span>{textOnButton}</span>
			</Link>
		</div>
	);
}

export default EmptyState;
