import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Menu({ cat }) {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`/api/post?cat=${cat}&limit=3`);
				setPosts(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [cat]);
	return (
		<div className="menu">
			<h1>Other posts you may like</h1>
			{posts.map(post => (
				<div className="post" key={post.id}>
					<img src={post.img}></img>
					<h2>{post.title}</h2>
					<Link to={`/posts/${post.id}`}>
						<button>Read more</button>
					</Link>
				</div>
			))}
		</div>
	);
}

export default Menu;
