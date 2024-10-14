"use client";

import React, { useEffect, useState } from "react";
import anime from "animejs";
import "@/styles/Background.css";


const Background = () => {
    const num = 60;
    const [dimensions, setDimensions] = useState({
        vw: 0,
        vh: 0
    });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                vw: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                vh: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            });
        };
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    useEffect(() => {
        starryNight();
        shootingStars();
    }, []);

    const starryNight = () => {
        anime({
            targets: [".sky .star"],
            opacity: [
                {
                    duration: 700,
                    value: "0",
                },
                {
                    duration: 700,
                    value: "1",
                },
            ],
            easing: "linear",
            loop: true,
            delay: (el, i) => 50 * i,
        });
    };

    const shootingStars = () => {
        anime({
            targets: [".shootingstars .wish"],
            easing: "linear",
            loop: true,
            delay: (el, i) => 500 * i,
            opacity: [
                {
                    duration: 200,
                    value: "1",
                },
            ],
            width: [
                {
                    value: "150px",
                },
                {
                    value: "0px",
                },
            ],
            translateX: 350,
        });
    };

    const randomRadius = () => Math.random() * 0.7 + 0.6;

    const getRandomX = () => Math.floor(Math.random() * dimensions.vw).toString();

    const getRandomY = () => Math.floor(Math.random() * dimensions.vh).toString();

    return (
        <div className="bg">
            <svg className="sky">
                {
                    [...Array(num)].map((_, y) => (
                        <circle
                            key={y}
                            className="star"
                            cx={getRandomX()}
                            cy={getRandomY()}
                            r={randomRadius()}
                            stroke="none"
                            strokeWidth="0"
                            fill="white"
                        />
                    ))
                }
            </svg>
            <div className="shootingstars">
                {
                    [...Array(60)].map((_, y) => (
                        <div
                            key={y}
                            className="wish"
                            style={{
                                left: `${getRandomY()}px`,
                                top: `${getRandomX()}px`,
                            }}
                        />
                    ))
                }
            </div>
        </div>
    );
};


export default Background;