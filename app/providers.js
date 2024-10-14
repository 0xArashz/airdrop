"use client";

import React from "react";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig, lightTheme } from "@rainbow-me/rainbowkit";


const queryClient = new QueryClient();
const config = getDefaultConfig({
    appName: "airdrop",
    projectId: "NO_ID",
    chains: [sepolia],
    ssr: true
});

const Providers = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={
                        lightTheme({
                            accentColor: "white",
                            accentColorForeground: "black"
                        })
                    }
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};


export default Providers;