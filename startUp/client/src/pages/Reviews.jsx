import Button from "@mui/material/Button";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import Link from '@mui/material/Link'
import { useNavigate } from "react-router-dom";

const Reviews = () => {

  const navigate = useNavigate
  const user = localStorage.getItem("userInfo")
  if (!user) {
    navigate("/");
  }
  return (
    <div style={{}} className='comp'>
    <div className="all">
      <div className="intro">
        <h1
          style={{
            fontSize: "2rem",
            fontFamily: "Arial, Helvetica, sans-serif",
            color:"#555"
          }}
        >
          Find great places and people to work with
        </h1>
        <p
          className="more"
          style={{
            fontSize: "1.2rem",
            fontFamily: "Arial, Helvetica, sans-serif",
            color:"#555"
          }}
        >
          Get access to millions of company and startup reviews
        </p>
      </div>
      <form className="nosubmit">
        <div className="serch">
          <input
            className="nosubmit"
            type="search"
            placeholder="Search Company name or job title"
          />
          <Button variant={"contained"}>Find Company/StartUP</Button>
        </div>
      </form>
      <a
        href="/listings"
        style={{
          marginLeft: "-520px",
          marginTop: "20px",
          textDecoration: "none",
        }}
      >
        view listings posted by companies and startups
      </a>
    </div>
    <div className="main">
      <h2 style={{ marginTop: "50px", marginLeft: "230px",color:"#555" }}>
        Browse Companies/Startups by Industry
      </h2>

      <div className="cards">
        <div className="cardi">
          <div
            className="flip"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <div className="log">
              <AirplanemodeActiveOutlinedIcon  style={{color:"tomato"}}/>
            </div>
            <a
              href="/technology"
              style={{ textDecoration: "none", color: "black" }}
            >
              Tech Industry
            </a>
          </div>
        </div>
        <div className="cardi">
          <div
            className="flip"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <div className="log">
              <LocalHospitalOutlinedIcon  style={{color:"blue"}}/>
            </div>
            <a
              href="/health"
              style={{ textDecoration: "none", color: "black" }}
            >
              Health Industry
            </a>
          </div>
        </div>
        <div className="cardi">
          <div
            className="flip"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <div className="log">
              <PriceChangeOutlinedIcon style={{color:"green"}}/>
            </div>
            <a
              href="/technology"
              style={{ textDecoration: "none", color: "black" }}
            >
              Finance Industry
            </a>
          </div>
        </div>
        <div className="cardi">
          <div
            className="flip"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <div className="log">
              <TrendingDownOutlinedIcon style={{color:"Brown"}} />
            </div>
            
            <a
              href="/technology"
              style={{ textDecoration: "none", color: "black" }}
            >
              Retail Industry
            </a>
          </div>
        </div>
        <div className="cardi">
          <div
            className="flip"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <div className="log">
              <LocalShippingOutlinedIcon  style={{color:"pink"}} />
            </div>
            <a
              href="/technology"
              style={{ textDecoration: "none", color: "black" }}
            >
              Transportation Industry
            </a>
          </div>
        </div>
        <div className="cardi">
          <div
            className="flip"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <div className="log">
              <LibraryMusicOutlinedIcon  style={{color:"gray"}}  />
            </div>
            <a
              href="/technology"
              style={{ textDecoration: "none", color: "black" }}
            >
            Arts and Entertainment Industry
            </a>
          </div>
        </div>
    
      </div>
      <br />
      <Link href="/companies" style={{marginLeft:"650px",textDecoration:"none"}}>View more &#8594;</Link>
    </div>
  </div>
  )
}

export default Reviews