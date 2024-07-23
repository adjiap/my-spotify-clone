"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import React from "react";
import PlayerContent from "./playercontent";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    // The exclamation point at the end of song is a Typescript expression
    // to say that the value is **definitely** non-null.
    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div
            className="
                fixed
                bottom-0
                bg-black
                w-full
                py-2
                h-[80px]
                px-4
            "
        >
            <PlayerContent
                // This `key` is actually a HACK by the original tutorial, to
                // reset the hook, when user decides to skip the current
                // running song to the next one.
                key={songUrl}
                song={song}
                songUrl={songUrl}
            />
        </div>
    )
}

export default Player;
