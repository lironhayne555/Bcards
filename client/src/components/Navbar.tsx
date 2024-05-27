import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactElement, useContext, useMemo, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { verifyToken } from '../auth/TokenManager';
import Logout from '../auth/Logout';
import { useAuth } from '../AppContext';
import { SearchContext } from '../searchContext';
import { log } from 'console';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function Navbar() {
const {user} = useAuth();
function showAbout() : boolean {
if(!verifyToken() || verifyToken()) 
    return true;
return false;
}

function showFavCards() : boolean {
if(verifyToken()) 
    return true;
return false;
}
function showMyCards() : boolean {
if((user?.isAdmin || user?.isBusiness) && verifyToken()) 
    return true;
return false;
}
function showAdminPannel() : boolean {
if((user?.isAdmin)  && verifyToken()) 
    return true;
return false;
}

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
    
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }),[mode]
  );
  function DynamicIcon(): ReactElement {
    if (mode === 'dark') return <DarkModeIcon style={{color: 'black'}} />;
    return <LightModeIcon style={{color: 'yellow'}} />;
  }
  

function handleClick() {
  const toggleMode = mode === 'dark' ? 'light' : 'dark';
  setMode(toggleMode);
}


    return (     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
        <Link to='/cards'><span color="inherit" className='logo'>BCards</span></Link>
{showAbout() &&
            <Link to="/about" style={{ textDecoration: 'none' ,color:"white"}}>
            <Button  color="inherit">ABOUT</Button>
            </Link>
}
            { showFavCards() &&
<Link to="/favCards" style={{ textDecoration: 'none' ,color:"white"}}>
 <Button  color="inherit">FAV CARDS</Button>
</Link>
}
           { showMyCards() &&
            <Link to="/myCards" style={{ textDecoration: 'none' ,color:"white"}}>
             <Button color="inherit">MY CARDS</Button> 
            </Link>
            }
             { showAdminPannel() && 
               <Link to="/adminPanel" style={{ textDecoration: 'none' ,color:"white"}}>
              <Button color="inherit">ADMIN PANEL</Button>  
              </Link>
            }
           
          </Typography>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onInput={handleSearchChange}
            />
          </Search>

      <ThemeProvider theme={theme}>
      <CssBaseline />
     <IconButton color='info' onClick={handleClick} >
     <DynamicIcon></DynamicIcon>
     </IconButton>
    </ThemeProvider>
          <Link to="/signup" style={{ textDecoration: 'none' ,color:"white"}}>
          <Button color="inherit">SIGNUP</Button>
          </Link>
          { !verifyToken() &&
                <Link to="/login" style={{ textDecoration: 'none' ,color:"white"}}>
               <Button color="inherit">LOGIN</Button>
                </Link>
          }
          { verifyToken() && 
          <Logout></Logout>
          }   
        </Toolbar>
      </AppBar>
    </Box>);
}

export default Navbar;
