import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

function Topnav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      {user && (
        <AppBar position="fixed">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/home"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                DaemonHQ
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/home")}
                    >
                      Home
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/reviews")}
                    >
                      Companies
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/salaries")}
                    >
                     Investors
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/stocks")}
                    >
                      Stock Market
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                DaemonHQ
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={() => navigate("/home")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Home
                </Button>
                <Button
                  onClick={() => navigate("/reviews")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Company Review
                </Button>
                <Button
                  onClick={() => navigate("/investors")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Find Investors
                </Button>
                <Button
                  onClick={() => navigate("/stocks")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Stock Market
                </Button>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  style={{color:"white"}}
                >
                  Forums
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
              
                  <MenuItem onClick={()=>navigate('/room')}>Join Forum</MenuItem>
                  <MenuItem onClick={()=>navigate('/nav')}>Inbox</MenuItem>
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="user profile" src={user.profile} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      href="/user/profile"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                  {user.isAdmin && (
                    <MenuItem>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <Typography
                      textAlign="center"
                      component={Link}
                      href="/company/create"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Add Company
                    </Typography>
                  </MenuItem>
                  {user && (
                    <MenuItem>
                      <Typography textAlign="center" onClick={logout}>
                        Logout
                      </Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}
export default Topnav;
