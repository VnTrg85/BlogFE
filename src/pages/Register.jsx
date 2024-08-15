import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faCircleInfo, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Register() {
	const [inputs, setInputs] = useState({
		Username: "",
		Password: "",
		Email: "",
		Posts: [],
	});
	const [err, setErr] = useState(false);
	const navigate = useNavigate();
	const handleChange = e => {
		setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			setErr(false);
			const res = await axios.post("/api/user/register", inputs);
			navigate("/login");
		} catch (err) {
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
					<Link style={{ textDecoration: "none", color: "white" }} to="/login">
						<h2>LOGIN</h2>
					</Link>
				</div>
				<div className="auth-container-bottom">
					<h1>USER REGISTER</h1>
					<div className="input-container">
						<FontAwesomeIcon icon={faEnvelope} />
						<input required type="Text" placeholder="Email" name="Email" onChange={e => handleChange(e)}></input>
					</div>
					<div className="input-container">
						<FontAwesomeIcon icon={faUser} />
						<input required type="text" placeholder="Username" name="Username" onChange={e => handleChange(e)}></input>
					</div>
					<div className="input-container">
						<FontAwesomeIcon icon={faLock} />
						<input required type="password" placeholder="Password" name="Password" onChange={e => handleChange(e)}></input>
					</div>
					<button className="btn-login" onClick={e => handleSubmit(e)}>
						REGISTER
					</button>
					{err && <p>This is an error!!!</p>}
				</div>
			</div>
			<div className="auth-info">designed by Truong</div>
		</div>
	);
}

export default Register;
