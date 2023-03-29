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
import SendIcon from "@mui/icons-material/Send";

const Bids = () => {
  const [post, setPost] = useState({});
  const [comp, setComp] = useState([]);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { id } = useParams();
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/listings/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id, comments]);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/companies`, {
        headers: {
          token: `Bearer ${user.token}`,
        },
      })
      .then((res) => setComp(res.data))
      .catch((err) => console.log(err));
  }, [user.token]);

  const filteredComp = comp.filter((res) => res._id === post.comp);
  console.log(post.comp)
  console.log(comp);
  if (!user) {
    navigate("/");
  }
  const placeBid = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:7000/api/listing/bids",
        {
          userName: user.fullName,
          userProfile: user.profile,
          listing: post._id,
          stake: content,
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
        toast.success("bid placed");
      })
      .catch((err) => console.log(err));
  };

  if (!post || !post.comments) {
    return <div>Loading...</div>;
  }

  const approve = (id) => {
    axios
      .put(`http://localhost:7000/api/listing/bids/${id}`)
      .then((res) => {
        console.log(res);
        setApproved(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{}}>
      <Card
        sx={{ maxWidth: 500, marginLeft: "120px", marginTop: "100px" }}
        className="cards"
      >
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
            }}
          >
            {" "}
            {moment(post.createdAt, "YYYYMMDD").fromNow()}
          </p>
        </Typography>
        <CardMedia
          component="img"
          height="400"
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
          }}
          onSubmit={placeBid}
        >
          <input
            type="text"
            className="form-control"
            placeholder="place bid eg.10K for 20%"
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <SendIcon />
          </button>
        </form>
      </Card>

      <div className="comments" style={{}}>
        {post.bids.map((bid) => (
          <div
            key={bid._id}
            style={{
              border: "1px solid #fff",
              width: "400px",
              margin: "10px",
              color: "#555",
            }}
          >
            <div style={{ border: "1px solid #555" }}>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                <Avatar src={bid.userProfile} />
                <p> {bid.userName}</p>
              </div>
              <p
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  width: "330px",
                }}
              >
                {bid.stake}
              </p>
              {/* use axios.put to update the aproved state and also if the post.user is = the user then show the approve button else indicate if approved or not */}

              {user._id === filteredComp[0]?.user && !approved && (
                <button className="btn btn-secondary" style={{ marginLeft: "10px",marginBottom:"10px" }} >Approve</button>
              )}
              {bid.isApproved === true && (
                <p className="btn btn-secondary" style={{ marginLeft: "10px" }}>
                  {bid.isApproved ? "Approved" : "pending"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bids;
