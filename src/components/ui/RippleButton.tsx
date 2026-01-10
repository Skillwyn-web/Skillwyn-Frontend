"use client";

import React, { MouseEvent, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    rippleColor?: string;
}

export const RippleButton = ({
    children,
    className,
    onClick,
    rippleColor = "rgba(255, 255, 255, 0.5)",
    ...props
}: RippleButtonProps) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    useEffect(() => {
        // Clean up ripples after animation
        if (ripples.length > 0) {
            const timeout = setTimeout(() => {
                setRipples((prev) => prev.slice(1));
            }, 600); // Match animation duration
            return () => clearTimeout(timeout);
        }
    }, [ripples]);

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const x = event.clientX - rect.left - radius;
        const y = event.clientY - rect.top - radius;

        setRipples((prev) => [...prev, { x, y, id: Date.now() }]);

        if (onClick) {
            onClick(event);
        }
    };

    return (
        <button
            className={cn(
                "relative overflow-hidden cursor-pointer active:scale-95 transition-transform duration-100",
                className
            )}
            onClick={createRipple}
            {...props}
        >
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute rounded-full pointer-events-none animate-ripple"
                    style={{
                        width: Math.max(props.style?.width as number || 0, 100) * 2 || "200%", // Fallback/Arbitrary large size if needed, but styling via CSS keyframes is better
                        height: Math.max(props.style?.height as number || 0, 100) * 2 || "200%",
                        left: ripple.x,
                        top: ripple.y,
                        backgroundColor: rippleColor,
                        transform: "scale(0)",
                    }}
                />
            ))}
            <span className="relative z-10">{children}</span>
        </button>
    );
};
