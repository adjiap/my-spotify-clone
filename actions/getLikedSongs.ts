import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies} from "next/headers";

const getLikedSongs = async():  Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
        .from("liked_songs")
        .select("*, songs(*)")      // Populates the result with the songs under liked_songs, as well as its song_id
        .eq("user_id", session?.user?.id)  // Fetches based on logged in user
        .order("created_at", {ascending: false});

        if (error){
            console.log(error)
            return [];
        };

        if (!data){
            return[];
        }

        return (data.map((item) => ({
            ...item.songs
        })));
}

export default getLikedSongs;
