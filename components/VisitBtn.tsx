"use client"
import React, {useEffect} from 'react';
import {Button} from "@/components/ui/button";

function VisitBtn({shareUrl}: { shareUrl: string }) {
    const [mounted, setMounted] = React.useState<boolean>(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) {
        return null
    }
    const shareLink = `${window.location.origin}/submit/${shareUrl}`
    return (
        <Button className={"w-[250px]"}
                onClick={() => {
                    window.open(shareLink, "_blank")
                }}
        >Visit</Button>
    )
}

export default VisitBtn;