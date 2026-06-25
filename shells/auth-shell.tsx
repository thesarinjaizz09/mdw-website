import Link from "next/link";

export function AuthShell({
    title,
    description,
    children,
    footer,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-emerald-50 px-4 py-10">
            <div className="w-full max-w-sm">

                <div className="rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 text-black">
                    {/* <div className="mb-2 flex flex-col items-start gap-2 text-left">
                        <Link
                            href="/"
                            className="mb-2 text-2xl font-semibold tracking-tight text-emerald-500"
                        >
                            MyDawaiWala
                        </Link>
                    </div> */}
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {title} to <span className="text-emerald-500">
                            MyDawaiWala
                        </span>
                    </h1>
                    <p className="text-sm text-muted-foreground mb-5">
                        {description}
                    </p>
                    {children}
                    {footer && (
                        <div className="mt-6 text-center text-sm text-muted-foreground">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}