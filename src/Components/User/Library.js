import React from "react";
import { CardContent, CardMedia, Stack, Grid } from "@mui/material";
import CardMenu from "./CardMenu";
import { useNavigate } from "react-router-dom";
import "../../styles/Home.css";
import { useGetPlaylistQuery } from "../../services/playlistAPIs";
import NoSongBox from "./NoSongBox";
export default function Library() {
  const navigate = useNavigate();

  const { data: userPlaylist, isFetching: userPlaylistFetching } =
    useGetPlaylistQuery("userPlaylist", {
      refetchOnMountOrArgChange: true,
    });
  console.log(userPlaylist);

  const totalPlaylist = userPlaylist?.length;

  return totalPlaylist ? (
    <div>
      <h1 className="title">Your library</h1>
      <Grid container spacing={4}>
        {userPlaylist?.map((el) => (
          <Grid
            onClick={() => navigate(`/user/playlist/${el?.id}`)}
            item
            display="flex"
            justifyContent="center"
            minHeight={280}
            marginBottom={3}
          >
            <CardMenu el={el} />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <div>
      <NoSongBox />
    </div>
  );
}
