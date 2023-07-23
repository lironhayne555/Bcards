import BottomNavigation from '@mui/material/BottomNavigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PortraitIcon from '@mui/icons-material/Portrait';
import InfoIcon from '@mui/icons-material/Info';
import { BottomNavigationAction, Grid } from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from '../App';
import { verifyToken } from '../auth/TokenManager';

function Footer() {
const context = useContext(AppContext);
console.log(context);
function showFavorite() : boolean {
if(verifyToken()) 
    return true;
return false;
}

function showMyCards() : boolean {

if(context?.business || context?.admin) 
    return true;
return false;
}
function showAbout() : boolean {

if(!verifyToken() || verifyToken()) 
    return true;
return false;
}

    return ( <><BottomNavigation showLabels>
               { showAbout() &&
  <BottomNavigationAction label="About" icon={<InfoIcon/>}></BottomNavigationAction>
}
               {  showFavorite() &&
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>}></BottomNavigationAction>
}
{ showMyCards() &&
 <BottomNavigationAction label="My Cards" icon={<PortraitIcon/>}></BottomNavigationAction>
}
                </BottomNavigation></>);
}

export default Footer;