import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-zinc-50 text-zinc-900">
        <AuthProvider>
            <Header />
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
