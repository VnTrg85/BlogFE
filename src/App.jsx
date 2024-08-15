import * as React from "react";
import "./styles.scss";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/fOOTER.JSX";
import Single from "./pages/Single";
import Write from "./pages/Write";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		children: [
			{ path: "/", element: <Home></Home> },
			{ path: "/posts/:id", element: <Single></Single> },
			{ path: "Write", element: <Write></Write> },
		],
	},
	{
		path: "/login",
		element: <Login></Login>,
	},
	,
	{
		path: "/register",
		element: <Register></Register>,
	},
]);

function App() {
	return (
		<div className="app">
			<div className="container">
				<RouterProvider router={router} />;
			</div>
		</div>
	);
}

export default App;
