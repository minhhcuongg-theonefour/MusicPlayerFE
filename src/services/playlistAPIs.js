import { music } from "./musicBaseApis";

const playlist = music.injectEndpoints({
  endpoints: (builder) => ({
    createPlaylist: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: `playlists`,
          body: body,
        };
      },
      invalidatesTags: ["UserPlaylist"],
    }),
    getPlaylist: builder.query({
      query: () => ({
        url: "playlists",
      }),
      providesTags: ["UserPlaylist"],
    }),
    getuserPlaylist: builder.query({
      query: (id) => ({
        url: `playlists/${id}`,
      }),
      providesTags: ["UserPlaylist"],
    }),
    removePlaylist: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `playlists/${id}`,
      }),
      invalidatesTags: ["UserPlaylist"],
    }),
    addSongToPlaylist: builder.mutation({
      query: ({ id_playlist, id_song }) => ({
        method: "POST",
        url: `playlists/${id_playlist}/songs/${id_song}`,
      }),
      invalidatesTags: ["UserPlaylist"],
    }),
    updatePlaylist: builder.mutation({
      query: ({ id, formData }) => ({
        method: "PUT",
        url: `playlists/${id}`,
        body: formData,
      }),
      invalidatesTags: ["UserPlaylist"],
    }),
    deleteSongFromPlaylist: builder.mutation({
      query: ({ playlistId, songId }) => ({
        method: "DELETE",
        url: `playlists/${playlistId}/songs/${songId}`,
      }),
    }),
    // invalidatesTags: ["UserPlaylist"],
  }),
  overrideExisting: false,
});

export const {
  useCreatePlaylistMutation,
  useGetPlaylistQuery,
  useRemovePlaylistMutation,
  useGetuserPlaylistQuery,
  useAddSongToPlaylistMutation,
  useUpdatePlaylistMutation,
  useDeleteSongFromPlaylistMutation,
} = playlist;
