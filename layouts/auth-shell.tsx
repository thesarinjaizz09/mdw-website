import Link from "next/link";

export function AuthShell({
    title,
    description,
    children,
    footer,
    showCompany = true
}: {
    title: string;
    description: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    showCompany?: boolean
}) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-10">
            <div className="w-full max-w-md">

                <div className="rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 text-black bg-[#F4568B]/20">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {title} {showCompany && 'to'} {showCompany && <span className="text-[#F4568B] font-bold">
                            MyDawaiWala
                        </span>}
                    </h1>
                    <p className="text-sm text-gray-600 mb-5">
                        {description}
                    </p>
                    {children}
                    {footer && (
                        <div className="mt-6 text-center text-sm text-gray-600">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}