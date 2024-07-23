"use client";

import Button from "@/components/button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUsers";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccountContent = () => {
    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const { isLoading, subscription, user } = useUser();

    const [loading, setLoading] = useState(false);
    
    useEffect(() =>{
        if (!loading && !user) {
            router.replace("/");
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: "/api/create-portal-link"
            });

            window.location.assign(url);
        } catch (error) {
            if (error) {
                toast.error((error as Error).message);
            }
        }
        setLoading(false);
    }

    return (
        <div className="mb-7 px-6">
            {!subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>No active plan</p>
                    {/* TODO: Create direct subscription when clicked, instead of opening a popup modal first */}
                    <Button
                        onClick={subscribeModal.onOpen}
                        className="w-[300px]"
                    >
                        {/* TODO: Placeholder only, `Premium` may need to be dynamic, but if there's multiple subscription plans, then it might make sense to keep it this way */}
                        {`Subscribe to Premium plan!`}  
                    </Button>
                </div>
            )}
            {subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>
                        You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.
                    </p>
                    <Button
                        disabled={loading || isLoading}
                        onClick={redirectToCustomerPortal}
                        className="w-[300px]"
                    >
                        Open customer portal
                    </Button>
                </div>
            )}
        </div>
    )
};

export default AccountContent;
