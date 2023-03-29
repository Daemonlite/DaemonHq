import React from 'react'
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState,useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CreateCompany = () => {
    const [contactEmail, setcontactEmail] = useState("");
    const [companyName, setcompanyName] = useState("");
    const [logo, setlogo] = useState("");
    const [location, setLocation] = useState("");
    const [description,setDescription]= useState("")
    const [type,setType] = useState("")
    const [officePhoneNumber,setOfficePhoneNumber] = useState("")
    const [netWorth,setNetWorth] = useState("")
    const [website,setWebsite] = useState("")
    const [services,setServices] = useState("")
    const [category,setCategory] = useState("")
    const [user,setUser] = useState("")

    const users = JSON.parse(localStorage.getItem("userInfo"))
  useEffect(()=>{

  setUser(users._id)
  },[users._id])

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
          setlogo(imageUrl);
        } catch (err) {
          console.log(err);
        }
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:7000/api/companies", {
           companyName,
           logo,
           description,
           type,
           contactEmail,
           officePhoneNumber,
           netWorth,
           services,
           website,
           category,
           user,
            location,
        },{
          headers: {
            token: `Bearer ${users.token}`,
          },
        })
          .then((res) => {
            toast.success("company created");
            if (res.data) {
              navigate("/home");
            }
            
          })
          .catch((err) => {
            toast.error(err);
          });
      };
    
  return (
    <div>
              <div className="">
      <h2 className="headi" style={{textAlign:"center",marginTop:'20px',color:"#555"}}>Build a solid industry with us Now</h2>
        <header>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            className="register "
          >
            <TextField
              id="outlined-basic"
              label="Enter your company Name"
              variant="outlined"
              type="text"
              onChange={(e) => setcompanyName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Enter  contactEmail"
              variant="outlined"
              type="text"
              onChange={(e) => setcontactEmail(e.target.value)}
            />
         <label htmlFor="profile">Choose profile photo</label>
         <TextField id="outlined-basic" type="file" variant="outlined" onChange={handleFileChange} />
         <TextField
              id="outlined-basic"
              label="Enter CompanyLocation"
              variant="outlined"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            />
                 <TextField
              id="outlined-basic"
              label="Describe your company"
              variant="outlined"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Specify if Company/Startup"
              variant="outlined"
              type="email"
              onChange={(e) => setType(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Enter customer care phone"
              variant="outlined"
              type="Number"
              onChange={(e) => setOfficePhoneNumber(e.target.value)}
            />
         <TextField
              id="outlined-basic"
              label="Enter Networth, specify K,M,B,T "
              variant="outlined"
              type="text"
              onChange={(e) => setNetWorth(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Enter website"
              variant="outlined"
              type="text"
              onChange={(e) => setWebsite(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="what services do you offer"
              variant="outlined"
              type="text"
              onChange={(e) => setServices(e.target.value)}
            />
            <select style={{color:"#555"}} className='form-control' onChange={(e) => setCategory(e.target.value)}>
                <option value="Technology Industry" className='form-control' selected>Technology Industry</option>
                <option value="Healthcare Industry" className='form-control'>Healthcare Industry</option>
                <option value="Finance Industry" className='form-control'>Finance Industry</option>
                <option value="Retail Industry" className='form-control'>Retail Industry</option>
                <option value="Energy Industry" className='form-control'>Energy Industry</option>
                <option value="Transportation Industry" className='form-control'>Transportation Industry</option>
                <option value="Manufacturing Industry" className='form-control'>Manufacturing Industry</option>
                <option value="Real Estate Industry" className='form-control'>Real Estate Industry</option>
                <option value="Consumer Goods Industry" className='form-control'>Consumer Goods Industry</option>
                <option value="Entertainment Industry" className='form-control'>Entertainment Industry</option>
                
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
  )
}

export default CreateCompany