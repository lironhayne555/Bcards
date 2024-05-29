import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../AppContext";
import { Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Typography } from "@mui/material";
import { Image, Phone } from "@mui/icons-material";
import { getCardById } from "../../services/CardServices";
//import "../../css/CardDetails.css";
function CardDetails () {
    const { _id } = useParams();
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [web, setWeb] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setimageAlt] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zip, setZip] = useState('');
  
    const {user} = useAuth();
    const [userId, setUserId] =useState(user?._id);
    const defaultImageUrl = "http://localhost:8080/images/default_image.jpg" ;
    const navigate = useNavigate();
      const handleGoBack = () => {
    navigate(-1); 
  };
     useEffect(() => {
console.log(_id);
        if (!_id) return;

        getCardById(_id)
            .then(json => {
              setTitle(json.title);
              setSubTitle(json.subtitle);
              setDescription(json.description);
              setPhone(json.phone);
              setEmail(json.email);
              setWeb(json.web);
              setImageUrl(json.imageUrl);
              console.log( json.imageUrl);

              setimageAlt(json.imageAlt);
              setState(json.state)
              setCountry(json.country);
              setCity(json.city);
              setStreet(json.street);
              setHouseNumber((json.houseNumber).toString());
              setZip(json.zip);

            })
    }, [_id])
  return (
     <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
              <CssBaseline />
    <Card className="cardContainer" sx={{ maxWidth: 300}}>
      {imageUrl ? (
      <CardMedia
        className="cardMedia"
        component="img"
        height="150"
        src={imageUrl}
        alt= {imageAlt? imageAlt : "Uploaded Image"}
      />) : (
      <CardMedia
        className='cardMedia'
        component="img"
        height="300"
        src={defaultImageUrl}
        alt="Default Image"
      />
)}
      
      <CardContent className="cardContainer"> 
      <Typography gutterBottom variant="h5" component="div"  className='title'>
        {title}
      </Typography>
      <Typography gutterBottom variant="h6" component="div"  className='subtitle'>
        {subtitle}
      </Typography>
      <br></br>
        <Typography  component="div" className='description'>
        Description: {description}
        </Typography>
        <Typography  component="div" className='address'>
        Address: {country} ,{city}, {street} ,{houseNumber}, {zip}</Typography>
        <Typography component="div" className='contactInfo'>
        Phone: {phone}
        </Typography>
        <Typography component="div" className='contactInfo'>
        Email: {email}
        </Typography>
          {web && (
          <Typography component="div" className='contactInfo'>
            Web: {web}
          </Typography>
        )}
      </CardContent>

      <CardActions disableSpacing>
      <Grid item container direction="row" style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}} >
      <Grid item container xs={12} spacing={0} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}} >
         <Grid>
                <Button onClick={() => handleGoBack()} className='backButton' size="small">BACK</Button>
              </Grid>
          </Grid>
        </Grid>
        </CardActions>
    </Card>
</Container>
  );
}
export default CardDetails;