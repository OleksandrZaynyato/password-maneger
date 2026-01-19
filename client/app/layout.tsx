import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="bg-zinc-50 text-zinc-900">
        <Header />
        <main className="max-w-5xl mx-auto px-6 py-12">
            {children}
        </main>
        </body>
        </html>
    );
}
