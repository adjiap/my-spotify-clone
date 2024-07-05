"use client";

import React from "react";
import Modal from "./modal";
import {
    useSessionContext,
    useSupabaseClient
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter;
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal(); 

    const onChange = (open: boolean) => {
        if (!open){
            onClose();
        }
    }

    return(
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen}
            onChange={onChange}
        >
           <Auth
            theme="dark" // theme of the pop up for login
            magicLink      // login using e-mails
            providers={["github"]}  // which providers should be shown during login, that's allowed for logging in. Default would've been Github, Google and Microsoft Azure for Supabase
            supabaseClient={supabaseClient}  // client object to be used
            appearance={{
                theme: ThemeSupa,   // overall appearance of theme
                variables: {
                    default: {
                        colors: {
                            brand: "#404040",
                            brandAccent: "#22c55e"
                        }
                    }
                }
            }}
           /> 
        </Modal>
    );
}

export default AuthModal;
