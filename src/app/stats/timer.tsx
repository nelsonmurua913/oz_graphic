import { formatTime } from "@/utils/formatTime";
import { useTimer } from "../../hook/useTimer";
import { useEffect, useState } from "react";

export default function Timer({status, clock}) {
    const { seconds, start, pause, reset } = useTimer();
    useEffect(() => {
        if (status === "inprogress") {
            start();
        } else {
            pause();
        }
        if(clock > 0) {
            reset(clock);
        }
    }, [clock, status]);
    return (
        <div>
            <div className="flex items-center justify-center gap-2">
                <p id="counter">{formatTime(seconds)}</p>
            </div>
        </div>
    );
}
