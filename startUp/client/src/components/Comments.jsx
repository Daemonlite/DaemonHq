import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import { useParams } from "react-router-dom";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import Tooltip from "@mui/material/Tooltip";
import SendIcon from '@mui/icons-material/Send';

const Comments = () => {
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { id } = useParams();

  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/listings/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id, comments]);

  const addComment = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:7000/api/comments",
        {
          userName: user.fullName,
          userProfile: user.profile,
          listing: post._id,
          content: content,
        },
        {
          headers: {
            token: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setComments(res.data);
        setContent("");
        toast.success("comment added");
      })
      .catch((err) => console.log(err));
  };

  if (!post || !post.comments) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{  }}>
      <Card sx={{ maxWidth: 500,marginLeft:"150px",height:"fit-content",marginTop:"100px"}} className="cards">
        <CardHeader title={post.headLine} subheader={post.companyName} />
        <Typography
          style={{
            marginLeft: "270px",
            marginTop: "-70px",
          }}
        >
          Total Revenue ${post.revenueGenerated}
          <br />
          <p
            style={{
              marginLeft: "-255px",
              fontSize:"15px"
            }}
          >
            {" "}
            {moment(post.createdAt, "YYYYMMDD").fromNow()}
          </p>
        </Typography>
        <CardMedia
          component="img"
          height="300"
          image={post.image}
          alt="Listing image"
          style={{
            marginTop: "-50px",
          }}
        />
        <CardContent>
          <Typography variant="body3" color="text.primary">
            {post.descr}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            gap: "32px",
            marginLeft: "50px",
            marginTop: "-30px",
          }}
        >
          <Tooltip title="comments">
            <IconButton>
              <ChatBubbleOutlineIcon style={{ fontSize: "30px" }} />
              {post.comments.length}
            </IconButton>
          </Tooltip>

          <Tooltip title="views">
            <IconButton aria-label="views">
              <VisibilityOutlinedIcon style={{ fontSize: "30px" }} />
              {post.views.length}
            </IconButton>
          </Tooltip>

          <Tooltip title="bids">
            <IconButton aria-label="bids">
              <ViewInArOutlinedIcon style={{ fontSize: "30px" }} />
              {post.bids.length}
            </IconButton>
          </Tooltip>

          <Tooltip title="save">
            <IconButton aria-label="bids">
              <BookmarkAddOutlinedIcon style={{ fontSize: "30px" }} />
            </IconButton>
          </Tooltip>
        </CardActions>
        <form
          action=""
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            marginLeft: "20px",
            width: "450px",
            marginTop:"-20px"
          }}
          onSubmit={addComment}
        >
          <input
            type="text"
            className="form-control"
            placeholder="enter comment"
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <SendIcon/>
          </button>
        </form>
      </Card>

      <div className="comments" style={{marginLeft:"50px"}}>
        {post.comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              border: "1px solid #fff",
              width: "400px",
              margin: "10px",
              color: "#555",
            }}
          >
            
          
          <div style={{}}>
          <div style={{ display: "flex", gap: "20px",marginLeft:"10px",marginTop:"10px" }}>
              <Avatar src={comment.userProfile} />
              <p> {comment.userName}</p>
            </div>
            <p style={{marginLeft:"10px",marginTop:"10px",width:"330px"}}>{comment.content}</p>
            <p className="reply" style={{marginLeft:"10px"}}>reply</p>
          </div>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Comments;
