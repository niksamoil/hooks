import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
	return (
		<div>
			<HookSwitcher />
		</div>
	);
};

const HookSwitcher = () => {

	const [color, setColor] = useState('gray');
	const [fontSize, setfontSize] = useState(20);



	return (
		<div
			style={{
				padding: "10px",
				background: color,
				fontSize: `${fontSize}px`
			}}
		>
			helloo
			<button onClick={() => setColor('black')}>Dark</button>
			<button onClick={() => setColor('white')}>Light</button>

			<button onClick={() => setfontSize((s) => s + 2)}>+</button>

		</div>
	);
};


