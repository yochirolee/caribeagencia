import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./Agency/Layout/DashboardLayout";
import "./index.css";
import { RouterApp } from "./Router/RouterApp";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<RouterApp />
		</BrowserRouter>
	</React.StrictMode>,
);
