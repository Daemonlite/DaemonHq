const Company = require('../Models/companyModel')
const Jobs = require('../Models/jobModel')

// remember to put company details into localstoage
const getJobs = async (req,res) => {
    try {
        const comp = await Jobs.find();
        return res.status(200).json(comp);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to retrieve Jobs" });
      }
}

const addJobs = async (req,res) => {
    const {jobTitle,companyName,companyLogo,location,jobDescription,jobType,
        requirements,skills,salary,contactEmail,comp,responsibilities,user} = req.body

    if(!jobTitle || !companyName  || !location || !jobDescription || !requirements || !jobType ||
        !skills || !salary || !contactEmail || !comp || !responsibilities  || !user || !companyLogo){
        return res.status(400).json({message:"fill in required fields"})
    }

   
    let existingCompany;
    try {
     existingCompany = await Company.findById(comp);
    } catch (error) {
      console.log(error);
    }
    if (!existingCompany) {
      return res.status(400).json({ message: "comment not found" });
    }

    const job = new Jobs({
        jobTitle,
        companyName,
        companyLogo,
        location,
        jobDescription,
        requirements,
        skills,
        salary,
        contactEmail,
        comp,
        responsibilities,
        applications:[],
        user,
        jobType
    })

    try {
      await job.save();
      existingCompany.jobs.unshift(job);
      await existingCompany.save();
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
    return res.status(201).json(job);

}

const updateJobPost = async (req, res) => {
  const compId = req.params.id;
  const updatedInfo = req.body;

  const upJobInfo = await Jobs.findByIdAndUpdate(compId, updatedInfo, {
    new: true,
  });

  if (!upJobInfo) {
    return res.status(404).json({ message: "job not found" });
  }

  res.status(200).json(upJobInfo);
      
  };
  
const deleteJob = async (req,res) => {
  const id = req.params.id;
  
  let job;
  try {
    job = await Jobs.findOne({ _id: id });
    if (!job) {
      return res
        .status(404)
        .json({ message: "The specified job was not found." });
    }
    await job.deleteOne({ _id: id });
    await Company.updateOne(
      { _id: job.comp },
      { $pull: { jobs: { _id: job._id } } }
    );
  } catch (err) {
    return res.status(500).json({
      message:
        "Unable to delete the  job. An internal server error has occurred.",
    });
  }
  return res
    .status(200)
    .json({ message: "Successfully deleted the  job." });
   
}

module.exports = {
    getJobs,
    addJobs,
    updateJobPost,
    deleteJob
    
}