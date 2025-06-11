import styles from '../../css/ColorBlock.module.css';
import { useColorsStore } from '../../stores/colorsStore';
import { FaCheck } from "react-icons/fa";

function ClassColorBlock({ classes = [], currentColorIndex, setColorIndex }) {
	const dbColors = useColorsStore((s) => s.colors);

	const colorList = dbColors.map((color, index) => {
		const isColorUsed = classes.find((cls) => Number(cls.colorIndex) === index);

		return (
			<label key={color} style={{ backgroundColor: color, transform: isColorUsed ? 'scale(0.75)' : '' }}>
				<input
					type="radio"
					name="colorIndex"
					id={color}
					value={index}
					onChange={() => setColorIndex(index)} 
					defaultChecked={index === Number(currentColorIndex) || !index}
				/>
				<FaCheck />
			</label>
		);
	});


	return (
		<section>
			<div className={styles.header}>
				<h3>Color</h3>
			</div>
			<div className={styles.colorList}>{colorList}</div>
		</section>
	);
}

export default ClassColorBlock;
