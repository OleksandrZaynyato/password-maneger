export default function HomePage() {
    return (
        <section className="text-center">
            <h1 className="text-5xl font-extrabold mb-6">
                Passwordless{" "}
                <span className="text-rose-600">Magic Link</span> Auth
            </h1>

            <p className="text-zinc-600 text-lg max-w-2xl mx-auto mb-10">
                A modern authentication system using magic links instead of passwords.
                Secure, simple, and user-friendly.
            </p>

            <div className="flex justify-center gap-4">
                <a
                    href="/register"
                    className="px-6 py-3 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-500 transition"
                >
                    Get Started
                </a>
                <a
                    href="/login"
                    className="px-6 py-3 rounded-xl border border-zinc-300 text-zinc-800 hover:border-amber-400 hover:text-amber-600 transition"
                >
                    Login
                </a>
            </div>
        </section>
    );
}
