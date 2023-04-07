import { useEffect, useState } from "react";
import axios from "axios";

const ProfileChange = () => {
  const [profile,setProfile] = useState("")

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
  return (
    <div style={{marginTop:"100px"}}>ProfileChange</div>
  )
}

export default ProfileChange