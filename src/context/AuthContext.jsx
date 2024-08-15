import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));
	const login = async inputs => {
		const data = await axios.post("/api/user/login", inputs);
		setCurrentUser(data.data);
	};
	const logout = async () => {
		const data = await axios.post("/api/user/logout");
		localStorage.removeItem("user");
		setCurrentUser(null);
	};

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
};
