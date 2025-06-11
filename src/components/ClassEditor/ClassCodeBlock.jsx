import styles from '../../css/FrequencyBlock.module.css';

function ClassCodeBlock({ code, setCode }) {
	return (
		<section>
			<div className={styles.header}>
				<h3>Class Code</h3>
			</div>
			<input
				type="text"
				name="code"
				id="code"
				style={{
		width: '100%',
		padding: '10px',
		fontSize: '1rem',
		border: '1px solid gray',
		borderRadius: '8px',
		boxSizing: 'border-box',
	}}
				
				value={code}
				onChange={(e) => setCode(e.target.value)}
				placeholder="e.g. ABC123"
			/>
		</section>
	);
}

export default ClassCodeBlock;
