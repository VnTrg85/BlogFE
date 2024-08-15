import Edit from "../img/Edit.png";
import Delete from "../img/Delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import parse from "html-react-parser";
function Single() {
	const { currentUser } = useContext(AuthContext);
	const [post, setPost] = useState({});
	const [ownUser, setOwnUser] = useState({});
	const location = useLocation();
	const postId = location.pathname.split("/")[2];
	const navigate = useNavigate();
	const handleDelete = async () => {
		try {
			const res = await axios.delete(`/api/post/${postId}`);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`/api/post/${postId}`);
				const resUser = await axios.get(`/api/user/${res.data.uid}`);
				setPost(res.data);
				setOwnUser(resUser.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [postId]);

	return (
		<div className="single">
			<div className="content">
				<img src={post.img}></img>
				<div className="user">
					<img
						src={
							ownUser.img ||
							"https://yt3.googleusercontent.com/ytc/AIdro_luF-nK_BZqKzocE3qJoPsgRpL88k9zVsyUsZc3evTj8w=s176-c-k-c0x00ffffff-no-rj"
						}
					></img>
					<div className="info">
						<span>{ownUser?.username}</span>
						<p>Posted {moment(post.date).fromNow()}</p>
					</div>
					{currentUser?.username == ownUser?.username && (
						<div className="edit">
							<Link className="link" to={`/write?edit=${post.id}`}>
								<img src={Edit}></img>
							</Link>
							<img onClick={handleDelete} src={Delete}></img>
						</div>
					)}
				</div>
				<h1>{post.title}</h1>
				{parse(`${post.desc}`)}
			</div>
			<Menu cat={post.cat}></Menu>
		</div>
	);
}

export default Single;
