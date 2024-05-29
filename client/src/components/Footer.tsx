import BottomNavigation from '@mui/material/BottomNavigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PortraitIcon from '@mui/icons-material/Portrait';
import InfoIcon from '@mui/icons-material/Info';
import { BottomNavigationAction, Grid, Paper } from '@mui/material';
import { useContext, useState } from 'react';
import { verifyToken } from '../auth/TokenManager';
import { useAuth } from '../AppContext';
import { Link } from 'react-router-dom';

function Footer() {
const {user} = useAuth();
function showFavorite() : boolean {
    if(verifyToken()) 
        return true;
    return false;
    }

function showMyCards() : boolean {

    if(user?.isBusiness || user?.isAdmin) 
        return true;
    return false;
    }
function showAbout() : boolean {

if(!verifyToken() || verifyToken()) 
    return true;
return false;
}

    return ( <>
<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
<BottomNavigation className='footer' showLabels>
               { showAbout() &&
  <BottomNavigationAction  component={Link} label="About" to="/about" icon={<InfoIcon/>}></BottomNavigationAction>
}
               {  showFavorite() &&
              <BottomNavigationAction component={Link} to="/favCards" label="Favorites" icon={ <FavoriteIcon/>}></BottomNavigationAction>
            }
{ showMyCards() &&
 <BottomNavigationAction label="My Cards" component={Link} to="/myCards" icon={<PortraitIcon/>}></BottomNavigationAction>
}
                </BottomNavigation></Paper></>);
}

export default Footer;