import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
function Login() {
	const [inputs, setInputs] = useState({
		Username: "",
		Password: "",
		Posts: [],
	});
	const navigate = useNavigate();
	const [err, setErr] = useState(false);
	const { login } = useContext(AuthContext);
	const handleChange = e => {
		setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			setErr(false);
			await login(inputs);
			navigate("/");
		} catch (err) {
			console.log(err);
			setErr(true);
		}
	};

	return (
		<div className="auth">
			<div className="auth-container">
				<div className="auth-container-top">
					<h1>
						Welcome <br></br>
						To the website
					</h1>
					<p>
						We believe in the power of words to inspire, educate, and connect. Our blog is more than just a collection of articles—it's a
						vibrant community where ideas flourish and creativity knows no bounds
					</p>
					<Link style={{ textDecoration: "none", color: "white" }} to="/register">
						<h2>CREATE ACCOUNT</h2>
					</Link>
				</div>
				<div className="auth-container-bottom">
					<h1>USER LOGIN</h1>
					<div className="input-container">
						<FontAwesomeIcon icon={faUser} />
						<input required type="text" placeholder="username" name="Username" onChange={e => handleChange(e)}></input>
					</div>
					<div className="input-container">
						<FontAwesomeIcon icon={faLock} />
						<input required type="password" placeholder="password" name="Password" onChange={e => handleChange(e)}></input>
					</div>
					<button className="btn-login" onClick={e => handleSubmit(e)}>
						LOGIN
					</button>
					{err && <p>This is an error!!!</p>}
				</div>
			</div>
			<div className="auth-info">designed by Truong</div>
		</div>
	);
}

export default Login;
