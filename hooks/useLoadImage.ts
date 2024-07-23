import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song: Song) => {
    const supabaseClient = useSupabaseClient();

    if (!song){
        return null;
    }

    // FYI images from the host server, needs to have its name entered in the `next.config.mjs` file
    const {data: imageData} = supabaseClient
        .storage
        .from("images")
        .getPublicUrl(song.image_path);

    return imageData.publicUrl
}

export default useLoadImage;