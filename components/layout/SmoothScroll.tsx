"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Force scroll to top on every page load — prevents browser/Lenis
        // from restoring a stale scroll position that starts mid-page.
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    return (
        <ReactLenis root options={{
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
        }}>
            {children}
        </ReactLenis>
    );
}
