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

const Technology = () => {
  const [comp, setComp] = useState([]);

const navigate = useNavigate()
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
  const filteredComp = comp.filter(
    (res) => res.category === "Technology Industry"
  );

  if (!filteredComp) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{marginTop:"100px"}}>
      <h2 className="head" id="two" style={{ marginLeft: "200px" }}>
        Technology Industry
      </h2>
      <form className="d-flex forme" role="search">
        <input
          className="form-control me-2 control"
          type="search"
          placeholder="Search company,startup"
          aria-label="Search"
        />
        <button className="btn btn-outline-primary" type="submit">
          Search
        </button>
      </form>
      <br />
      <br />
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
               <div style={{
                display:"flex",
                justifyContent:"space-between"
               }}>
               <Typography gutterBottom variant="h5" component="div">
                  {res.companyName}
                </Typography>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
               </div>
                <Typography variant="body2" color="text.secondary">
                  {res.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined" onClick={() => navigate(`/company/${res._id}`)}>
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
                    delete
                  </Button>
                )}
              </CardActions>
              
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technology;
