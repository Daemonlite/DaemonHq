import {useState,useEffect} from 'react'
import axios from 'axios'
import CheckIcon from '@mui/icons-material/Check';
import Button from  '@mui/material/Button'
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
const Jobs = () => {
  const [jobs,setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  
  const navigate = useNavigate()
  if (!user) {
    navigate("/");
  }
  useEffect(()=> {
    axios.get('http://localhost:7000/api/jobs/find',{
      headers:{
        token: `Bearer ${user.token}`,
      },
    })
    .then((res)=>{
      const sortedPosts = res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setJobs(sortedPosts)
    })
    .catch((err)=> console.log(err.data))
  },[user.token,jobs])

  const handleViewMore = (job) => {
    setSelectedJob(job);
  }

  return (
    <div>
      {jobs.map((res)=>
        <div className='jobs' key={res._id}>
          {/* <img src={res.companyLogo}  alt='logo'/> */}
          <div className="sk">
            <div className="job-title">
              {res.jobTitle}
            </div>
            <div className="location">
              {res.location}
            </div>
            <div className="cop">
              {res.companyName}
            </div>
            <div className="slip">
              <div className="salary type">
                ${res.salary}<CheckIcon />
              </div>
              <div className="type">
                {res.jobType} <CheckIcon />
              </div>
              <div className="date">
            posted  { moment(res.createdAt, "YYYYMMDD").fromNow()}
              </div>
            </div>
            <div className="descr">
              {res.jobDescription}
            </div>
            <div className="ski">
              {res.skills}
            </div>

          </div>
          <div className="btns">
            <Button variant='contained' style={{ marginTop: "40px", marginLeft: "10px",color:"white"}} href='#detail' onClick={() =>{
               handleViewMore(res)
    
            }}>View more</Button>
          </div>
        </div>
      )}

      {selectedJob && (
        <div className="detailpage" id='detail'>
          <div className="job-title">
            {selectedJob.jobTitle}
          </div>
          <div className="location">
            {selectedJob.location}
          </div>
          <div className="cop">
            {selectedJob.companyName}
          </div>
          <div className="slip">
            <div className="salary type">
              ${selectedJob.salary}<CheckIcon />
            </div>
            <div className="type">
              {selectedJob.jobType} <CheckIcon />
            </div>
          </div>
          <br />
          <div className="type">Responsibility</div>
          <div className="descr">
            {selectedJob.responsibilities}
          </div>
          <br />
          <div className="type">Requirements:</div>
          <div className="descr">
            {selectedJob.requirements}
          </div>
          <br />
          <div className="ski">
            <div className="type">Skills</div>
            {selectedJob.skills}
          </div>
          <div className="btns">
            <Button variant='contained' style={{ marginTop: "40px", marginLeft: "10px"}}>Apply Now</Button>
          </div>
        </div>
        
      )}
    </div>
  )
}

export default Jobs
