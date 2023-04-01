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
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";

const Investors = () => {
    const [inv, setinv] = useState([]);

    const navigate = useNavigate()
      const user = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {
        axios
          .get("http://localhost:7000/api/users", {
            headers: {
              token: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            const sortedPosts = res.data.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setinv(sortedPosts);
          })
          .catch((err) => console.log(err));
      });
      const filteredinv = inv.filter(
        (res) => res.isInvestor === true
      );
      if (!filteredinv) {
        return <div>Loading...</div>;
      }
  return (
    <div className='investors'>
              <h2 className="head" id="two" style={{ marginLeft: "200px" }}>
       Find Investors
      </h2>
      <form className="d-flex forme" role="search">
        <input
          className="form-control me-2 control"
          type="search"
          placeholder="Search for investors"
          aria-label="Search"
        />
        <button className="btn btn-outline-primary" type="submit">
          Search
        </button>
      </form>
      <br />
      <br />
      <div className="care">
        {filteredinv.map((res) => (
          <div key={res._id} className="care">
            <Card sx={{ maxWidth: 445 }}>
              <CardMedia
                sx={{ height: 240 }}
                image={res.profile}
                title="Health Industry"
              />
              <CardContent>
               <div style={{
                display:"flex",
                justifyContent:"space-between"
               }}>
               <Typography gutterBottom variant="h5" component="div">
                  {res.fullName}
                </Typography>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
               </div>
                <Typography variant="body2" color="text.secondary">
                  {res.bio}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined" >
               Follow
                </Button>
      
                <Button size="small" variant="contained" onClick={() => navigate(`/user/${res._id}`)}>
               view profile
                </Button>
              </CardActions>
              
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Investors