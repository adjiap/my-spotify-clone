"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUsers";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
    songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
    songId,
}) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext(); 

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    // Checks if the song has been liked or not
    useEffect(() => {
        // Checks if user is logged in
        if (!user?.id) {
            return;
        };
        
        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("liked_songs")
                .select("*")
                .eq("user_id", user.id)
                .eq("song_id", songId)
                .single();
                
                if (!error && data) {
                    setIsLiked(true);
                };
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart
    const handleLike = async () => {
        // This ensures, if the user hasn't logged in, they'll open the authentication modal up
        if (!user) {
            return authModal.onOpen();
        }

        if (isLiked) {
            const { error } = await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id", user.id)
                .eq("song_id", songId);
                
                if (error){
                    toast.error(error.message);
                } else {
                    setIsLiked(false);
                };
        } else {
            const { error } = await supabaseClient
                .from("liked_songs")
                .insert({
                    user_id: user.id,
                    song_id: songId
                });
            if (error){
                toast.error(error.message);
            } else{
                setIsLiked(true);
                toast.success("Liked!");
            };
        };
        router.refresh();
    }

    return (
        <button
            onClick={handleLike}
            className="
                hover:opactiy-75
                transition
            "
        >
            <Icon color={isLiked ? "#22c55e": "white"} size={25} />
        </button>
    )
};

export default LikeButton;
