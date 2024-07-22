"use client";

import React, { useState } from "react";
import MediaItem from "./mediaitem";
import LikeButton from "./likebutton";
import { Song } from "@/types";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./slider";
import usePlayer from "@/hooks/usePlayer";


interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = usePlayer();

    const Icon = false ? BsPauseFill : BsPlayFill;
    const VolumeIcon = true ? HiSpeakerXMark : HiSpeakerWave

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }
    
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1]

        if (!previousSong){
            return player.setId(player.ids[player.ids.length - 1])
        }

        player.setId(previousSong);
    };

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }
    
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1]

        if (!nextSong){
            return player.setId(player.ids[0])
        }

        player.setId(nextSong);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="
                flex
                w-full
                justify-start
            ">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            {/* The below div is relevant for mobile view */}
            <div
                className="
                    flex
                    md:hidden
                    col-autow-full
                    justify-end
                    items-center
                "
            >
                <div
                    onClick={() => {}}
                    className="
                        h-10
                        w-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black"/>
                </div>
            </div>
            {/* This will be the backward, forward, and play button */}
            <div
                className="
                    hidden
                    h-full
                    md:flex
                    justify-center
                    items-center
                    w-full
                    max-w-[722px]
                    gap-x-6
                "
            >
                <AiFillStepBackward
                    size={30}
                    onClick = {onPlayPrevious}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                    />
                <div
                    onClick={() => {}}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black" />
                </div>
                <AiFillStepForward
                    size={30}
                    onClick = {onPlayNext}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
            </div>
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon 
                        onClick={() => {}}
                        className="cursor-pointer"
                        size={34}
                    />
                    <Slider />
                </div>
            </div>
        </div>
    )
}

export default PlayerContent;