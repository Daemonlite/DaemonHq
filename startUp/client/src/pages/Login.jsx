import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GitHubLogin from "react-github-login";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:7000/api/users/login/", {
        email,
        password,
      })
      .then((res) => {
        toast.success("login successful");
        if (res.data) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/home");
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

  const onSuccess = (response) => {
    console.log(response);
  };

  const onFailure = (response) => {
    console.error(response);
  };
  return (
    <div>
      <div className="land">
        <header>
          <h1 className="head">Welcome to a professional community</h1>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            className="login"
          >
            <TextField
              id="outlined-basic"
              label="Enter Email"
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="field"
            />
            <br />
            <br />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setpassword(e.target.value)}
                className="field"
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
            <br />
            <a href="/reset">forgot password?</a>
            <br />
            <Button
              variant="contained"
              style={{ width: "435px" }}
              type="submit"
            >
              sign In
            </Button>
            <br />
            <p style={{ textAlign: "center" }}>or</p>
            <br />
            <div className="google">
              <GitHubLogin
                clientId="d51c0725ac9179df482e"
                onSuccess={onSuccess}
                onFailure={onFailure}
              />
            </div>
            <a href="/register" className="google">
              New to Daemonhq? signUp
            </a>
          </Box>
        </header>
        <div className="head-img">
          <img
            src="https://img.freepik.com/premium-vector/african-girl-study-computer-online-learning-concept-video-lesson-distance-study_186332-185.jpg?w=740"
            alt=""
            width="800px"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
