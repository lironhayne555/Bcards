import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { verifyToken } from "../auth/TokenManager";
import Logout from "../auth/Logout";
import { useAuth } from "../AppContext";
import { SearchContext } from "../searchContext";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CssBaseline, Menu, MenuItem } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar() {
  const { user } = useAuth();
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mode, setMode] = useState<"light" | "dark">("light");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function showAbout(): boolean {
    return verifyToken() !== null;
  }

  function showFavCards(): boolean {
    return verifyToken() !== null;
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  function handleClick() {
    const toggleMode = mode === "dark" ? "light" : "dark";
    setMode(toggleMode);
  }

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function showMyCards() {
    return (user?.isAdmin || user?.isBusiness) && verifyToken();
  }

  function showAdminPannel() {
    return user?.isAdmin && verifyToken();
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link
                to="/cards"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                BCards
              </Link>
            </Typography>
            {!isSmallScreen && (
              <>
                {showAbout() && (
                  <Link
                    to="/about"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Button color="inherit">ABOUT</Button>
                  </Link>
                )}
                {showFavCards() && (
                  <Link
                    to="/favCards"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Button color="inherit">FAV CARDS</Button>
                  </Link>
                )}
                {showMyCards() && (
                  <Link
                    to="/myCards"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Button color="inherit">MY CARDS</Button>
                  </Link>
                )}
                {showAdminPannel() && (
                  <Link
                    to="/adminPanel"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Button color="inherit">ADMIN PANEL</Button>
                  </Link>
                )}
              </>
            )}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={handleSearchChange}
              />
            </Search>
            <IconButton color="inherit" onClick={handleClick}>
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            {!verifyToken() ? (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">LOGIN</Button>
              </Link>
            ) : (
              <Logout />
            )}
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {showAbout() && (
            <MenuItem onClick={handleMenuClose}>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                ABOUT
              </Link>
            </MenuItem>
          )}
          {showFavCards() && (
            <MenuItem onClick={handleMenuClose}>
              <Link
                to="/favCards"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                FAV CARDS
              </Link>
            </MenuItem>
          )}
          {showMyCards() && (
            <MenuItem onClick={handleMenuClose}>
              <Link
                to="/myCards"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                MY CARDS
              </Link>
            </MenuItem>
          )}
          {showAdminPannel() && (
            <MenuItem onClick={handleMenuClose}>
              <Link
                to="/adminPanel"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                ADMIN PANEL
              </Link>
            </MenuItem>
          )}
          <MenuItem onClick={handleMenuClose}>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              SIGNUP
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    </ThemeProvider>
  );
}

export default Navbar;
