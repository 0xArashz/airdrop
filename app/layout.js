import { Space_Mono } from "next/font/google";
import Providers from "@/providers";
import Background from "@/components/Background";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";


const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"]
});

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={spaceMono.className}>
            <head>
                <link rel="icon" href="favicon.png" type="image/png" />
                <title>Claim $NULL Airdrop</title>
            </head>
            <body>
                <Background />
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}


export default RootLayout;