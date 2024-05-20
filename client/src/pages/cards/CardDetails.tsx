import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AppContext";
import { useCardsContext } from "../../CardContext";
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Image, Phone } from "@mui/icons-material";
import { getCardById } from "../../services/CardServices";

function CardDetails () {
    const { _id } = useParams();
    const {cards,setCards } = useCardsContext();
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
    const [userId, setUserId] =useState(user?._id)
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
    <Card className='m-5' sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="194"
        src={imageUrl}
      />
      <CardContent> 
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        {subtitle}
      </Typography>
      <br></br>
        <Typography  component="div">
        Description: {description}
        </Typography>
        <Typography  component="div">
        Address: {country} ,{city}, {street} ,{houseNumber}, {zip}</Typography>
        <Typography component="div">
        Phone: {phone}
        </Typography>
        <Typography component="div">
        Email: {email}
        </Typography>
        {web === '' || web === null} {
        <Typography component="div">
        Web: {web}
        </Typography>
        }
        {imageAlt === '' || imageAlt === null} {
         <Typography component="div">
         ImageAlt: {imageAlt}
        </Typography>
        }

      </CardContent>

      <CardActions disableSpacing>
      <Grid item container direction="row" style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}} >
      <Grid item container xs={12} spacing={0} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}} >
        <Grid>
        <Typography>    
        back to all Cards
        </Typography>
        </Grid>
          </Grid>
        </Grid>
        </CardActions>
    </Card>
  );
}
export default CardDetails;