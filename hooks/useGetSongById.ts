// In reality, we could use a GetServerComponent from Supabase, like in .\actions\getSongs.ts
// But the tutorial had chosen to do several types of solutions.

import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined>(undefined)
    // The reason why we use useSessionContext, is because we want to have only `authenticated users` to retrieve the songs
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) {
            return;
        }
        
        setIsLoading(true);
        
        const fetchSong = async () => {
            const { data, error } = await supabaseClient
            .from("songs")
            .select("*")
            .eq("id", id)
            .single();  // To retrieve only one record
            
            if (error) {
                setIsLoading(false);
                return toast.error(error.message)
            }
            
            setSong(data as Song)
            setIsLoading(false);
        }
        fetchSong();
    }, [id, supabaseClient]);       // This just means, the "dependency array" is `id` and `supabaseClient`

    return useMemo(() => ({
        isLoading,
        song,
    }), [isLoading, song]);
}

export default useGetSongById;
