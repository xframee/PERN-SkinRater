import { useState } from "react";
import { Button, Menu, MenuItem, Rating } from "@mui/material";
import { useUser } from "../context/UserContext";   // your auth hook

export default function RateMenuStars({ skinId, onRated }) {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu  = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  async function save(value) {
    closeMenu();
    if (!user) return; // user must be logged in to rate

    try {
      await fetch("http://localhost:5000/rate-skin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include cookies for auth
        body: JSON.stringify({ skin_id: skinId, rating: value })
      });
      onRated?.(value);
    } catch (err) {
      console.error("Failed to rate skin:", err);
    }
  }

  return (
    <>
      <Button size="small" disabled={!user} onClick={openMenu}>
        {user ? "Rate" : "Login to rate"}
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem disableRipple sx={{ cursor: "default" }}>
          {/* 10-star picker */}
          <Rating
            max={10}
            onChange={(_, ratingValue) => ratingValue && save(ratingValue)}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
