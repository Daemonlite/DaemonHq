import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const UpdateUserInfo = () => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [isInvestor, setIsInvestor] = useState(false);
    const [location,setLocation] = useState("")

    const user = JSON.parse(localStorage.getItem("userInfo"))

    const navigate = useNavigate();
   
    useEffect(() => {
        fetch("https://ipapi.co/json/")
          .then((response) => response.json())
          .then((data) => {
            setLocation(data.city);
          });
      }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .put(`http://localhost:7000/api/users/${user._id}`, {
            fullName,
            email,
            bio,
            isInvestor,
            location
          })
          .then((res) => {
            toast.success("Profile infos updated");
            if (res.data) {
              navigate("/user/profile");
            }

            setEmail("");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      };
    ;
  return (
    <div style={{ marginTop: "100px" }}>
<div className="back">
      <div>
        <header>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            className="register"
          >
            <TextField
              id="outlined-basic"
              label="Enter your full Name"
              variant="outlined"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Enter  Email"
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Add Bio"
              variant="outlined"
              type="text"
              onChange={(e) => setBio(e.target.value)}
              className="bio"
            />
            <select
              style={{ color: "#555" }}
              className="form-control"
              onChange={(e) => setIsInvestor(e.target.value)}
            >
              <option value="nothing">
                Are you an Investor
              </option>
              <option value="true" className="form-control">
                Yes
              </option>
              <option value="false" className="form-control">
                No
              </option>
            </select>

            <Button
              variant="contained"
              style={{ width: "425px" }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </header>
      </div>
    </div>


    </div>
  )
}

export default UpdateUserInfo