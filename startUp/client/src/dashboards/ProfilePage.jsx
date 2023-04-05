import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
const ProfilePage = () => {
  const [comp, setComp] = useState([]);
  const [profile,setProfile] = useState("")

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    axios
      .get("http://localhost:7000/api/companies", {
        headers: {
          token: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const sortedPosts = res.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setComp(sortedPosts);
      })
      .catch((err) => console.log(err));
  });
  const filteredComp = comp.filter((res) => res.user === user._id);

  if (!filteredComp) {
    return <div>Loading...</div>;
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ztzo5rzi");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dxt2sumzc/image/upload",
        formData
      );
      const imageUrl = res.data.secure_url;
      setProfile(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
<div className="fit">
  <div className="profile">
    <img src={user.profile} alt="" className="profile-img" width={200} />
  </div>
  <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleFileChange}>
        <input hidden accept="image/*" type="file" />
        <PhotoCamera  className='edit-btn'/>
      </IconButton>
  <div className="inf">
  
    <div className="username">{user.fullName}</div>
    <div className="location">
      <LocationOnIcon />
      {user.location}
    </div>
  </div>
</div>
<div className="bio">{user.bio}</div>

      <a href="/user/update" className="create">
       Edit Profile
      </a>

    

      <h2 className="head" id="two" style={{ marginLeft: "200px" }}>
        My Companies
      </h2>

      <div className="care">
        {filteredComp.map((res) => (
          <div key={res._id} className="care">
            <Card sx={{ maxWidth: 445 }}>
              <CardMedia
                sx={{ height: 240 }}
                image={res.logo}
                title="Technology Industry"
              />
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {res.companyName}
                  </Typography>
                  <Rating
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                  />
                </div>
                <Typography variant="body2" color="text.secondary"></Typography>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/company/${res._id}`)}
                >
                  Explore
                </Button>

                <Button size="small">See Jobs</Button>

                {user._id === res.user && (
                  <Button
                    size="small"
                    onClick={() => {
                      axios
                        .delete(
                          `http://localhost:7000/api/companies/${res._id}`,
                          {
                            headers: {
                              token: `Bearer ${user.token}`,
                            },
                          }
                        )
                        .then((res) => toast.success("deleted"))
                        .catch((err) => toast.error(err));
                    }}
                  >
                    Delete
                  </Button>
                )}
              </CardActions>
            </Card>
          </div>
        ))}

      </div>
      {filteredComp.length === 0 && (<p className="emp">You have no companies <a href='company/create'>create one</a></p>)}
    </div>
  );
};

export default ProfilePage;
