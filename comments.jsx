import React, { useState, useEffect } from "react";
import "../style/comments.css";
import "../style/comments.css";
import { TbSend } from "react-icons/tb";
import Navigation from "./navigation";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

function Comments() {

    const [comment, setcomment] = useState([]);
    const [updatedComment, setUpdatedComment] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [commentID, setCommentID] = useState("");
    const { imgID } = useParams();


    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:3333/comment/${imgID}`,
            headers: {
                "Content-Type": "Appplication/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            setcomment(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [updatedComment])

    const commentPost = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `http://localhost:3333/comment/${imgID}`,
            data: JSON.stringify({ comment: commentContent }),
            headers: {
                "Content-Type": "Application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            setUpdatedComment([...comment, res.data]);
            setCommentContent("");
        }).catch((err) => {
            console.log(err);
        })
    }

    const commentDelete = (e) => {
        e.preventDefault();
        axios({
        method:"DELETE",
        url:`http://localhost:3333/comment/${commentID}`,
        headers:{
            "Content-Type":"Application/json",
            "Authorization":localStorage.getItem("token")
        }
        }).then((res)=>{
            setUpdatedComment(comment.filter((item)=>item._id !== commentID));
        }).catch((err)=>{
            console.log(err);
        })
    }

    const commentSelect = (id) => {
        setCommentID(id);
    }


    return (
        <div>
            <Navigation />
            <div className="comment-container">
                <h3>Comments</h3>
                {comment.map((item, index) => {
                    const isCurrentUser = item.commentBy._id === localStorage.getItem("userID");
                    const isHovered = item._id === commentID;
                    return (

                        <div className="comments" key={index} onMouseOver={() => { commentSelect(item._id) }} >
                            <div className="comment-sec-1">
                                <div className="comments-pic">
                                    <Link to={`/profile/${item.commentBy._id}`}> <img src={`http://localhost:3333/profilephoto/${item.commentBy
                                        .profilephoto}`} alt="" /></Link>
                                </div>
                                <div className="content">
                                    <Link to={`/profile/${item.commentBy._id}`}><h5>{item.commentBy.username}</h5></Link>
                                    <p>{item.comment}</p>
                                </div>
                            </div>
                            <div className="comment-sec-2">
                                {isCurrentUser && isHovered && (
                                    <button className="delete-btn" onClick={(e)=>{commentDelete(e)}}>{<AiFillDelete size={15} />}</button>
                               
                                )}
                            </div>
                        </div>
                    )
                })}

                <div className="input-comment">
                    <form method="post" onSubmit={(e) => { commentPost(e) }}>
                        <div className="comment-box">
                            <input type="text" placeholder="Add a comment..." value={commentContent} onChange={(e) => { setCommentContent(e.target.value) }}></input>
                            <button type="submit">{<TbSend size={20} style={{ color: "black" }} />}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Comments;