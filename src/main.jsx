import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Agency/Store/StoreApp";
import "./index.css";
import { RouterApp } from "./Router/RouterApp";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<RouterApp />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
