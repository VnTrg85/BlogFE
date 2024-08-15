import BlogLogo from "../img/BlogLogo.png";

function Footer() {
	return (
		<footer className="footer">
			<img src={BlogLogo} alt=""></img>
			<span>
				Made with ♥ and <b>ReactJS</b>
			</span>
		</footer>
	);
}

export default Footer;
