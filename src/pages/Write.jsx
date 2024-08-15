import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import BounceLoader from "react-spinners/BounceLoader";
function Write() {
	const { currentUser } = useContext(AuthContext);
	const [desc, setDesc] = useState("");
	const [title, setTitle] = useState("");
	const [file, setFile] = useState("https://static.thenounproject.com/png/4595376-200.png");
	const [cat, setCat] = useState("");
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const id = location.search.split("=")[1];
	useEffect(() => {
		const getData = async () => {
			try {
				const resData = await axios.get(`/api/post/${id}`);
				setTitle(resData.data.title);
				setDesc(resData.data.desc);
				setFile(resData.data.img);
				setCat(resData.data.cat);
			} catch (error) {
				console.log(error.message);
			}
		};
		if (id) {
			getData();
		} else {
			setTitle("");
			setDesc("");
			setFile("https://static.thenounproject.com/png/4595376-200.png");
			setCat("");
		}
	}, [id]);
	const override = {
		position: "absolute",
		top: "30%",
		left: "48%",
	};

	const getDate = () => {
		const time = new Date();
		const date = time.getDate();
		const month = time.getMonth();
		const year = time.getFullYear();
		return `${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`;
	};
	const handleClick = async e => {
		e.preventDefault();
		if (title == "") {
			return swal("Notification", "The title field is required", "warning");
		} else if (desc == "") {
			return swal("Notification", "The description field is required", "warning");
		} else if (file == "https://static.thenounproject.com/png/4595376-200.png") {
			return swal("Notification", "The image field is required", "warning");
		} else if (cat == "") {
			return swal("Notification", "The category field is required", "warning");
		}
		setLoading(true);

		if (id) {
			var tempFile = file;
			if (file.name) {
				const data = new FormData();
				data.append("file", file);
				data.append("upload_preset", "ImageBlog");
				try {
					const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/vantruong/image/upload", data);
					const { url } = uploadRes.data;
					tempFile = url;
				} catch (error) {
					console.log(error.message);
				}
			}
			try {
				const res = await axios.put(`/api/post/${id}`, {
					Id: id,
					Title: title,
					Desc: desc,
					Img: tempFile,
					Cat: cat,
					Date: getDate(),
					Uid: currentUser.id,
					UserId: currentUser.id,
					User: { Posts: [] },
				});
				const resUser = await axios.get(`/api/post/${id}`);
				setLoading(false);
				swal("Success!!!", "The post has been updated", "success");
				navigate(`/posts/${resUser.data.id}`);
			} catch (error) {
				console.log(error.message);
			}
		} else {
			const data = new FormData();
			data.append("file", file);
			data.append("upload_preset", "ImageBlog");
			try {
				const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/vantruong/image/upload", data);
				const { url } = uploadRes.data;
				const res = await axios.post("/api/post", {
					Title: title,
					Desc: desc,
					Img: url,
					Cat: cat,
					Date: getDate(),
					Uid: currentUser.id,
					UserId: currentUser.id,
					User: { Posts: [] },
				});
				const id = await axios.get("/api/post/MaxId");
				setLoading(false);
				swal("Success!!!", "The post has been uploaded", "success");
				navigate(`/posts/${id.data}`);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="add">
			{loading && (
				<div className="waiting">
					<BounceLoader color="#36d7b7" cssOverride={override} size={100} />
				</div>
			)}
			<div className="content">
				<input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title}></input>
				<div className="editorContainer">
					<ReactQuill className="editor" theme="snow" value={desc} onChange={setDesc} />
				</div>
			</div>
			<div className="menu">
				<div className="item">
					<h1>Publish</h1>
					<span>
						<b>Status</b> Draft
					</span>
					<span>
						<b>Visibility</b> Public
					</span>
					<input style={{ display: "none" }} type="file" id="file" onChange={e => setFile(e.target.files[0])}></input>
					<img src={file.name ? URL.createObjectURL(file) : file}></img>
					<label className="file" type="file" htmlFor="file">
						Upload image
					</label>
					<div className="buttons">
						<button>Save as a draft</button>
						<button onClick={e => handleClick(e)}>Publish</button>
					</div>
				</div>
				<div className="item">
					<h1>Category</h1>
					<div className="cat">
						<input
							type="radio"
							name="gr"
							value="art"
							id="art"
							onChange={e => setCat(e.target.value)}
							checked={cat == "art" ? true : false}
						></input>
						<label htmlFor="art">ART</label>
					</div>
					<div className="cat">
						<input
							type="radio"
							name="gr"
							value="science"
							id="science"
							onChange={e => setCat(e.target.value)}
							checked={cat == "science" ? true : false}
						></input>
						<label htmlFor="science">SCIENCE</label>
					</div>
					<div className="cat">
						<input
							type="radio"
							name="gr"
							value="technology"
							id="technology"
							onChange={e => setCat(e.target.value)}
							checked={cat == "technology" ? true : false}
						></input>
						<label htmlFor="technology">TECHNOLOGY</label>
					</div>
					<div className="cat">
						<input
							type="radio"
							name="gr"
							value="design"
							id="design"
							onChange={e => setCat(e.target.value)}
							checked={cat == "design" ? true : false}
						></input>
						<label htmlFor="design">DESIGN</label>
					</div>
					<div className="cat">
						<input
							type="radio"
							name="gr"
							value="cinema"
							id="cinema"
							onChange={e => setCat(e.target.value)}
							checked={cat == "cinema" ? true : false}
						></input>
						<label htmlFor="cinema">CINEMA</label>
					</div>
					<div className="cat">
						<input
							type="radio"
							name="gr"
							value="food"
							id="food"
							onChange={e => setCat(e.target.value)}
							checked={cat == "food" ? true : false}
						></input>
						<label htmlFor="food">FOOD</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Write;
