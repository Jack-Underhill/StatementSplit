import { useState, useEffect } from "react";

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

export default function useWindowBreakpoint() {
    const getBreakpoint = (width) => {
        if(width < breakpoints.sm) return 'xs';
        if(width < breakpoints.md) return 'sm';
        if(width < breakpoints.lg) return 'md';
        if(width < breakpoints.xl) return 'lg';
        if(width < breakpoints['2xl']) return 'xl';
        return '2xl'
    };

    const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));
    
    useEffect(() => {
        const handleResize = () => {
            setBreakpoint(getBreakpoint(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return breakpoint;
}