import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

function Home() {
	const cats = ["art", "science", "technology", "design", "cinema", "food"];
	const [posts, setPosts] = useState([]);
	const cat = useLocation().search;
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`/api/post${cat}`);
				setPosts(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [cat]);

	return (
		<div className="home">
			<div className="posts">
				{posts.map(post => (
					<div className="post" key={post.id}>
						<Link to={`/posts/${post.id}`} className="link">
							<div className="img">
								<img src={post.img} alt=""></img>{" "}
							</div>
						</Link>
						<div className="content">
							<Link className="link" to={`/posts/${post.id}`}>
								<h>{post.title}</h>
							</Link>
							<p>{parse(`${post.desc}`)}</p>
							<Link className="link" to={`/posts/${post.id}`}>
								<button>Read more</button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
