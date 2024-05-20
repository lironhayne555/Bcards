import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { Button, Grid } from '@mui/material';
import { createContext, useContext, useState } from 'react';
import { verifyToken } from '../auth/TokenManager';
import { title } from 'process';
import { useAuth } from '../AppContext';

export interface Card {
    _id?: string ;
    title: string;
    subtitle:string;
    description: string;
    phone: string;
    email:string;
    web: string;
    imageUrl: string;
    imageAlt: string;
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number | string;
    zip: string;
    userId: string | null ;
    favorites?: [] | null ;
    formData?: FormData | null;
    
}

interface CardProps extends Card {
handleDelete: Function,
showCruds:boolean
handleSetFave: Function,
isRed: boolean,
handleUpdate: Function,
handleWhatsapp:Function,
handleShowDetails:Function

}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({
  _id,
  title,
  subtitle,
  description,
  phone,
  email,
  web,
  imageUrl,
  imageAlt,
  state,
  country,
  street,
  houseNumber,
  city,
 zip,
favorites,
handleDelete,
showCruds,
handleSetFave,
isRed,
handleUpdate,
handleWhatsapp,
handleShowDetails
}: CardProps ) {
  const [expanded, setExpanded] = React.useState(false);
   const {user} = useAuth();
  //const [isRedHeart, setIsRedHeart] = useState(false);
function showButtonDelete () : boolean {
if(user?.isAdmin || showCruds)  
    return true;
return false;
}

function showButtonPhone () : boolean {
if( !verifyToken() || verifyToken())
    return true;
return false;
}
function showButtonFavorit () : boolean {
if( verifyToken()) 
    return true;
return false;
}
function showButtonUpdate () : boolean {
if(user?.isAdmin || showCruds) 
    return true;
return false;
}
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className='m-5' sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        src='../../../server/public/images/171498842426912345.png'
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
        Phone: {phone}
        </Typography>
        <Typography  component="div">
        Address: {street} {houseNumber}, {city} ,{country}</Typography>
        <Typography component="div">
        CardNumber:
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
      <Grid item container direction="row" style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}} >
      <Grid item container xs={12} spacing={0} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}} >
      <Grid item xs={1.5}>
          { showButtonDelete() &&
          
          <IconButton onClick={()=>handleDelete()}  aria-label='delete' >
          <DeleteIcon></DeleteIcon>
          </IconButton>

          }
          </Grid>
         <Grid item xs={1.5}>
         { showButtonUpdate() && 
        
        <IconButton aria-label='update' onClick={() => handleUpdate()}>
          <ModeIcon></ModeIcon>
        </IconButton>
       
}
 </Grid>
<Grid item xs={6}></Grid>
        <Grid item xs={1.5}>
{ showButtonPhone() &&
  
        <IconButton onClick={()=>handleWhatsapp()} aria-label='contact us'>
            <PhoneIcon ></PhoneIcon>
        </IconButton>

}
</Grid>
      <Grid item xs={1.5}>
 { showButtonFavorit() &&

<IconButton aria-label="add to favorites" 
 onClick={() => 
{ handleSetFave()

}}>
          <FavoriteIcon style={{color: isRed ? "red" : "" }}/>
        </IconButton>

}
        </Grid>
<Grid > 
 <Button onClick={()=>handleShowDetails(_id)} size="small">More Details</Button>
</Grid>
          </Grid>
        </Grid>
        </CardActions>
    </Card>
  );
}