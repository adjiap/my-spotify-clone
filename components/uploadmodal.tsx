"use client";

import uniqid from "uniqid";
import React, { useState } from "react";
import Modal from "./modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./input";
import Button from "./button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUsers";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const uploadModal = () => {
    const uploadModal = useUploadModal();
    const [ isLoading, setIsLoading ] = useState(false);
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,
        }
    })

    // To close the modal once we click the close button
    const onChange = (open: boolean) => {
        if (!open){
            reset();
            uploadModal.onClose();
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user){
                toast.error("Missing fields");
                return;  // important, so that we don't continue and try to upload something
            }

            const uniqueID = uniqid();

            // Upload song
            const {
                data: songData,
                error: songError,
            }  = await supabaseClient
                .storage
                .from("songs")
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: "3600",
                    upsert: false
                })
            if (songError){
                setIsLoading(false)
                return toast.error("Failed song upload.");
            }
            
            // Upload image
            const {
                data: imageData,
                error: imageError,
            }  = await supabaseClient
                .storage
                .from("images")
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: "3600",
                    upsert: false
                })
            if (imageError){
                setIsLoading(false)
                return toast.error("Failed image upload.");
            }

            const {
                error: supabaseError
            } = await supabaseClient
                .from("songs")
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path,
                });
            if (supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song uploaded");
            reset();
            uploadModal.onClose();
        } catch (error){
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4" // Add separation between input boxes
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", { required:true })}  // must be the same as id
                    placeholder="Song Title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register("author", { required:true })}
                    placeholder="Song author"
                />
                <div className="pb-1">
                    Select a song from file
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"       // would only accept .mp3 files
                        {...register("song", { required:true })}
                    />
                </div>
                <div className="pb-1">
                    Select an image
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"   // would only accept files that are images in nature, like .png or .jpeg
                        {...register("image", { required:true })} 
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Add Song
                </Button>
            </form>
        </Modal>
    )
}

export default uploadModal;
