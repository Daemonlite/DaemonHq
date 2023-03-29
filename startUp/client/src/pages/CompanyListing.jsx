import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import Tooltip from "@mui/material/Tooltip";
import moment from 'moment'



const CompanyListing = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

 
  if (!user) {
    navigate("/");
  }
  useEffect(() => {


    axios
      .get("http://localhost:7000/api/listings", {
        headers: {
          token: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const sortedPosts = res.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setPost(sortedPosts);
      })
      .catch((err) => console.log(err));
  }, [post, user.token]);


  if (!post) {
    return <div>Loading...</div>;
  }
 console.log(user._id)
  return (
    <div className="position">
      {post.map((res) => (
        <>
          <div key={res._id} className="listing" >
            <Card sx={{ maxWidth: 500 }} className="cards">
          
              <CardHeader title={res.headLine} subheader={res.companyName}  />
              <Typography
                style={{
                  marginLeft: "270px",
                  marginTop: "-70px",
                }}
              >
                Total Revenue ${res.revenueGenerated}
                <br />
              <p style={{
                marginLeft:"-255px"
              }} >  { moment(res.createdAt, "YYYYMMDD").fromNow()}</p>
              </Typography>
              <CardMedia
                component="img"
                height="400"
                image={res.image}
                alt="Listing image"
                style={{
                  marginTop: "-50px",
                }}
              />
              <CardContent>
                <Typography variant="body3" color="text.primary">
                  {res.descr}
                  
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
                  <IconButton
                    onClick={() => navigate(`/listing/${res._id}`)}
                  >
                    <ChatBubbleOutlineIcon style={{ fontSize: "30px" }}  />
                    {res.comments.length}
                  </IconButton>
                </Tooltip>

                <Tooltip title="views">
                  <IconButton aria-label="views">
                    <VisibilityOutlinedIcon style={{ fontSize: "30px" }} />
                    {res.views.length}
                  </IconButton>
                </Tooltip>

                <Tooltip title="bids">
                  <IconButton aria-label="bids"  onClick={() => navigate(`/listings/${res._id}`)}>
                    <ViewInArOutlinedIcon style={{ fontSize: "30px" }} />
                    {res.bids.length}
                  </IconButton>
                </Tooltip>

                <Tooltip title="save">
                  <IconButton aria-label="bids">
                    <BookmarkAddOutlinedIcon style={{ fontSize: "30px" }} />
                  </IconButton>
                </Tooltip>
              </CardActions>
              
       
      
            </Card>
            <br />
          </div>
        </>
      ))}
     

    </div>
  );
};

export default CompanyListing;
