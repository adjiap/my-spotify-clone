import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song: Song) => {
    // The reason why we use useSupabaseClient instead of useSessionContext, is because
    // we're also allowing `non-authenticated` users to also access the Song URL
    const supabaseClient = useSupabaseClient();

    if (!song){
        return "";
    }

    const {data: songData} = supabaseClient
        .storage
        .from("songs")
        .getPublicUrl(song.song_path);
    
    return songData.publicUrl;
};

export default useLoadSongUrl;
