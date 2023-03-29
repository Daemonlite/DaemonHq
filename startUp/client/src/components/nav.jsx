import {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link'
export default function Nav() {
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const navigate = useNavigate()
const [anchorElUser, setAnchorElUser] = useState(null);


const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
};

const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};

const user = JSON.parse(localStorage.getItem("userInfo"));
const logout = () => {
  localStorage.removeItem("userInfo");
  navigate("/");
};
  return (
<div>
  
{user && <Box sx={{ width: '100%' }}>

<Tabs
  value={value}
  onChange={handleChange}
  textcolor="primary"
  indicatorColor="primary"
  aria-label="secondary tabs example"

>
  <Typography style={{marginRight:"50px",marginTop:"8px",fontSize:"1.4rem",fontFamily:"ariel",color:"GrayText",marginLeft:"15px",}} >DaemonHQ</Typography>
  <Tab value="one" label="Home"  onClick={()=> navigate('/home')}/>
  <Tab value="two" label="Company Reviews"  onClick={()=> navigate('/reviews')}/>
  <Tab value="three" label="Find Salaries"  onClick={()=> navigate('/salaries')} />
  <Tab value="four" label="Post Job" style={{marginLeft:"600px"}} onClick={()=> navigate('/jobs/post')}/>
  <Box sx={{ flexGrow: 0 }}>
    
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
         <Avatar alt="Remy Sharp" src={user.profile} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        
          <MenuItem  onClick={handleCloseUserMenu}>
            <Typography textAlign="center" component={Link} href="user/profile" style={{textDecoration:"none",color:"inherit"}}>Profile</Typography>
          </MenuItem>
          {user.isAdmin && <MenuItem><Typography textAlign="center">Dashboard</Typography></MenuItem>}
        <MenuItem><Typography textAlign="center" component={Link} href="/company/create" style={{textDecoration:"none",color:"inherit"}}>Add Company</Typography></MenuItem>
         {user && <MenuItem><Typography textAlign="center" onClick={logout} >Logout</Typography></MenuItem>}
          
        
      </Menu>
    </Box>
</Tabs>


<hr />
</Box>}
</div>
  );
}