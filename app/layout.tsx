import {Inter} from 'next/font/google'
import {ClerkProvider} from "@clerk/nextjs";

import {ModalProvider} from "@/providers/modal-provider";
import {ToastProvider} from "@/providers/toast-provider";

import "./globals.css";
import prismadb from "@/lib/prismadb";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: "Admin Dashboard",
    description: "Admin Dashboard",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        // Mută afterSignOutUrl aici
        <ClerkProvider afterSignOutUrl="/">
            <html lang="en">
            <body className={inter.className}>
            <ToastProvider />
            <ModalProvider />
            {children}
            </body>
            </html>
        </ClerkProvider>
    );
}
