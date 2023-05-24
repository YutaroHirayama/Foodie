import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import App from "./App";

import "./index.css";

export const starRes = (rating) => {
	const starColor = {
		1: { color: 'rgb(255, 204, 75)'},
		2: { color: 'rgb(255, 173, 72)'},
		3: { color: 'rgb(255, 135, 66)'},
		4: { color: 'rgb(255, 100, 61)'},
		5: { color: 'rgb(251, 80, 60)'},
	}

	let stars = []
	for (let i = 1; i <= 5; i++) {
		if(i - rating === 0.5) stars.push(<i className="fa-solid fa-star-half-stroke" style={starColor[Math.floor(rating)]}/>)
		else if(i <= rating) stars.push(<i className="fa-solid fa-star" style={starColor[Math.floor(rating)]}/>)
		else stars.push(<i className="fa-regular fa-star" style={starColor[Math.floor(rating)]}/>)
	}

	return stars
}

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	window.store = store;
	window.sessionActions = sessionActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
	return (
		<ModalProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App />
					<Modal />
				</BrowserRouter>
			</Provider>
		</ModalProvider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);
