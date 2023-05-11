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
    getDetailsPlaylist: builder.query({
      query: ({ id }) => ({
        url: `playlists/${id}`,
      }),
      providesTags: ["UserAddToPlaylist"],
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
      invalidatesTags: ["UserAddToPlaylist"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePlaylistMutation,
  useGetPlaylistQuery,
  useRemovePlaylistMutation,
  useGetDetailsPlaylistQuery,
  useAddSongToPlaylistMutation,
} = playlist;
