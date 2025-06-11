import React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function UserMenu({ userId, onLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // optional helper if you need to programmatically push:
  const go = (path) => {
    handleClose();
    navigate(path);
  };

  if (!userId) return null; // show nothing if user is not logged in

  return (
    <>
      <Button
        color="inherit"
        id="user-menu-button"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
      >
        Dashboard
      </Button>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ list: { "aria-labelledby": "user-menu-button" } }}
      >
        <MenuItem
          component={RouterLink}
          to={`/profile/${userId}`}
          onClick={handleClose}
        >
          Profile
        </MenuItem>

        <MenuItem onClick={() => go(`/account/${userId}`)}>My account</MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            onLogout();            // <- clear cookie/context, then redirect if you like
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
