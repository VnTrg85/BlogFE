import { Link, useNavigate } from "react-router-dom";
import LogoBlog from "../img/BlogLogo.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navnar() {
	const { currentUser, logout } = useContext(AuthContext);
	return (
		<div className="navbar">
			<div className="container">
				<Link to="/">
					<div className="logo">
						<img src={LogoBlog} alt=""></img>
					</div>
				</Link>
				<div className="links">
					<Link className="link" to="/?cat=art">
						<h6>ART</h6>
					</Link>
					<Link className="link" to="/?cat=science">
						<h6>SCIENCE</h6>
					</Link>
					<Link className="link" to="/?cat=technology">
						<h6>TECHNOLOGY</h6>
					</Link>
					<Link className="link" to="/?cat=design">
						<h6>DESIGN</h6>
					</Link>
					<Link className="link" to="/?cat=cinema">
						<h6>CINEMA</h6>
					</Link>
					<Link className="link" to="/?cat=food">
						<h6>FOOD</h6>
					</Link>
					{currentUser && <span className="hightlight">{currentUser.username}</span>}
					{currentUser ? (
						<Link className="link" to="/">
							<span onClick={logout}>Log out</span>
						</Link>
					) : (
						<Link style={{ fontSize: "18px" }} className="link" to="/login">
							Login
						</Link>
					)}
					{currentUser && (
						<span className="write">
							<Link className="link" to="/write">
								Write
							</Link>
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navnar;
