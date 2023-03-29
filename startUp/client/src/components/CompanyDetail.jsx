import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';

const CompanyDetailsPage = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const user = JSON.parse(localStorage.getItem("userInfo"))
  
    useEffect(() => {
      axios
        .get(`http://localhost:7000/api/companies/${id}`)
        .then((res) => setCompany(res.data))
        .catch((err) => console.log(err));
    }, [id]);
  
    if (!company) {
      return <div>Loading...</div>;
    }
  return (
    <div style={{ marginLeft:"100px",display:"flex",gap:"50px",marginTop:"160px" }}>
    <Card sx={{ width: '450px', marginTop: '1rem' }}>
      <CardMedia
        component="img"
        sx={{ height: 240 }}
        image={company.logo}
        alt={company.companyName}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {company.companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {company.description}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '1rem' }}>
          Company Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '0.5rem' }}>
          <strong>Location:</strong> {company.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Industry:</strong> {company.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Website:</strong> <a href={company.website} target='_blank' rel="noreferrer">{company.website}</a>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Networth:</strong> $ {company.netWorth}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Services:</strong> {company.services}
        </Typography>
        </CardContent>
      </Card>




      
    </div>
  );
};

export default CompanyDetailsPage;
