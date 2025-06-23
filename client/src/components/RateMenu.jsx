import { useState } from "react";
import { Button, Menu, MenuItem, Rating, Snackbar } from "@mui/material";
import { useUser } from "../context/UserContext";

export default function RateMenuStars({ skinId, onRated }) {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);

  const openMenu  = e => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  async function save(value) {
    closeMenu();
    if (!user) return;

    try {
      await fetch("http://localhost:5000/rate-skin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",                    // sends JWT cookie with the userinfo
        body: JSON.stringify({ skin_id: skinId, rating: value })
      });

      setToastOpen(true);
      onRated?.();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Button size="small" disabled={!user} onClick={openMenu}>
        {user ? "Rate" : "Login to rate"}
      </Button>

      {/* 10-star picker in a dropdown */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem disableRipple sx={{ cursor: "default" }}>
          <Rating
            max={10}
            onChange={(_, ratingValue) => ratingValue && save(ratingValue)}
          />
        </MenuItem>
      </Menu>

      {/* 2-second confirmation toast when a rating has been given */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        message="Rating saved!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
