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
import { Grid } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../App';
import { verifyToken } from '../auth/TokenManager';

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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
   const context = useContext(AppContext);

function showButtonDelete () : boolean {
if( context?.admin) 
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
if( context?.admin) 
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
        image="/static/images/cards/paella.jpg"
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        test
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        testing
      </Typography>
      <br></br>
        <Typography  component="div">
        Phone: 
        </Typography>
        <Typography  component="div">
        Address:</Typography>
        <Typography component="div">
        CardNumber:
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Grid item container direction="row" style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}} >
      <Grid item container xs={12} spacing={0} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}} >
<Grid item xs={1.5}>
          { showButtonDelete() &&
          
          <IconButton aria-label='delete' >
          <DeleteIcon></DeleteIcon>
          </IconButton>

          }
          </Grid>
         <Grid item xs={1.5}>
         { showButtonUpdate() &&
        
        <IconButton aria-label='update'>
          <ModeIcon></ModeIcon>
        </IconButton>
       
}
 </Grid>
<Grid item xs={6}></Grid>
        <Grid item xs={1.5}>
{ showButtonPhone() &&
  
        <IconButton aria-label='contact us'>
            <PhoneIcon ></PhoneIcon>
        </IconButton>

}
</Grid>
      <Grid item xs={1.5}>
 { showButtonFavorit() &&

<IconButton aria-label="add to favorites" >
          <FavoriteIcon />
        </IconButton>

}
</Grid>
          </Grid>
        </Grid>
        </CardActions>
    </Card>
  );
}