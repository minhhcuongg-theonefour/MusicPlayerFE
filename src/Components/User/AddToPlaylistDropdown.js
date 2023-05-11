import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuItem from "@mui/material/MenuItem";
import {
  useGetPlaylistQuery,
  useAddSongToPlaylistMutation,
} from "../../services/playlistAPIs";

function AddToPlaylist({ song }) {
  const { data: playlistUser, isFetching: playlistUserFetching } =
    useGetPlaylistQuery();

  const [addSongToPlaylist] = useAddSongToPlaylistMutation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleAddToPlaylist = async (event, playlistId, songId) => {
    setAnchorEl(null);
    event.stopPropagation();
    await addSongToPlaylist({ id_playlist: playlistId, id_song: songId });
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        <IconButton
          sx={{ color: "#fff" }}
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <BsThreeDotsVertical />
        </IconButton>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <Typography
            fontSize="30"
            weight="medium"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Add to :
          </Typography>
          {playlistUser?.map((item) => (
            <MenuItem
              onClick={(e) => handleAddToPlaylist(e, item?.id, song?.id)}
            >
              {item?.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}

export default AddToPlaylist;