import { removeToken, removeUser } from "./TokenManager";
import { Avatar, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Stack } from "@mui/material";
import { log } from "console";
import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../AppContext";
let profile = require('../profile.png');
 export default function Logout() {
   const navigate = useNavigate();
 const { setUser } = useAuth();
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {     
    }
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
    function handleClickLoguot(){
        setOpen(false);
        removeUser();
        setUser(null);
       navigate('/login');
    }
    
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);



  

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
 
    return (
  <Stack direction="row">
      {/* <Paper>
        <MenuList>
          <MenuItem>LOGUOT</MenuItem>
        </MenuList>
      </Paper> */}
   <Button
         ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}>
<div className="avatar-container">
          <Avatar src={profile} ></Avatar>
        </div>
  </Button>
<div>
<Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClickLoguot}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
    );
}
