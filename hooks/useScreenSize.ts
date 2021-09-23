import { useEffect, useState } from "react";
import { WindowSize } from "types";

const useScreenSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({ height: 0, width: 0 });
    const [breakPoint, setBreakPoint] = useState<"sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | undefined>();

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            const width = window.innerWidth;

            if (width < 640) setBreakPoint("sm");
            else if (width < 768) setBreakPoint("md");
            else if (width < 1024) setBreakPoint("lg");
            else if (width < 1280) setBreakPoint("xl");
            else if (width < 1536) setBreakPoint("2xl");
            else setBreakPoint("3xl");
        };
        handleResize(); // run on first render
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { width: windowSize.width, height: windowSize.height, breakPoint };
};

export default useScreenSize;
