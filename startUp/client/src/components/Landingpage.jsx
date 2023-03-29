import {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Jobs from '../pages/Jobs';
import CompanyListing from '../pages/CompanyListing';
import Tooltip from "@mui/material/Tooltip";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from "@mui/material/IconButton";
// import { useNavigate } from 'react-router-dom';
const Landinpage = () => {
  const [value, setValue] = useState('one');
//  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [activeItem, setActiveItem] = useState('Company/Startup Listings');

  const handleClick = item => {
    setActiveItem(item);
  };

  return (
    <div style={{marginTop:"100px"}} id='top'>
   <form className="d-flex forme" role="search"  >
        <input className="form-control me-2 control sich" type="search" placeholder="What listing,title,keyword,company,startup" aria-label="Search"/>
        <input className="form-control me-2 control sich" type="search" placeholder="Where  city,state,or remote " aria-label="Search"/>
        <button className="btn btn-outline-primary bbt" type="submit" >Search</button>
      </form>

      <Box sx={{ width: '100%',display:"flex",justifyContent:"center",marginTop:"50px" }} className='bar' >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
        
      >
        <Tab value="one" label="Company/Startup Listings" onClick={() => handleClick('Company/Startup Listings')} />
        <Tab value="two" label="Company/Startup Jobs" onClick={() => handleClick('Company/Startup Jobs')} />
      
      </Tabs>

    </Box>
    <hr />

    {activeItem === 'Company/Startup Listings' && <CompanyListing />}
    {activeItem === 'Company/Startup Jobs' && <Jobs />}

    <Tooltip title="Top" >
                  <IconButton aria-label="bids"  >
                   <a href="#top" className='tops'>
                   <KeyboardArrowUpIcon style={{ fontSize: "30px" }}  />
                   </a>
                  </IconButton>
                </Tooltip>
    </div>
  );
};
export default Landinpage;
