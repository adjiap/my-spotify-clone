import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUsers";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const subscribeModal = useSubscribeModal();
    const { user, subscription } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }
        
        if (!subscription) {
            return subscribeModal.onOpen();
        }

        // This will play the song of the current id
        player.setId(id);
        // This will create a playlist of all the songs in the same area of the given id,
        // meaning, all the songs at the sidebar or the songs in the search results, etc.
        player.setIds(songs.map((song) => song.id))
    };

    return onPlay;
}

export default useOnPlay;
