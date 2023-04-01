import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GoogleLogin } from "react-google-login";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [profile, setProfile] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [isInvestor, setIsInvestor] = useState(false);

  //fetches the users location automatically
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        setLocation(data.city);
      });
  }, []);
  const navigate = useNavigate();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:7000/api/users/register/", {
        fullName,
        email,
        password,
        profile,
        location,
        bio,
        isInvestor,
      })
      .then((res) => {
        toast.success("Register successful");
        if (res.data) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/");
        }
        setpassword("");
        setEmail("");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //gogle registration
  const handleGoogleSuccess = async (googleData) => {
    const res = await axios.post(
      "http://localhost:7000/api/users/register/google",
      {
        token: googleData.tokenId,
      }
    );
    if (res.data) {
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      navigate("/");
    }
  };

  const handleGoogleFailure = (error) => {
    console.log(error);
  };

  return (
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
              <option value="nothing" selected>
                Are you an Investor
              </option>
              <option value="true" className="form-control">
                Yes
              </option>
              <option value="false" className="form-control">
                No
              </option>
            </select>
            <label htmlFor="profile">Choose profile photo</label>
            <TextField
              id="outlined-basic"
              type="file"
              variant="outlined"
              onChange={handleFileChange}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setpassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              variant="contained"
              style={{ width: "425px" }}
              type="submit"
            >
              Submit
            </Button>
            <p style={{ textAlign: "center" }}>or</p>

            <div className="google">
              <div
                id="g_id_onload"
                data-client_id="992093751924-tn4hp8r1ois9khru52plohmrug93sgap.apps.googleusercontent.comD"
                data-context="signup"
                data-ux_mode="popup"
                data-login_uri="http://localhost:3000/"
                data-itp_support="true"
              ></div>

              <div
                class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
              ></div>
            </div>
            <a href="/" className="google">
              Have an account? Login
            </a>
          </Box>
        </header>
      </div>
    </div>
  );
};

export default Register;
