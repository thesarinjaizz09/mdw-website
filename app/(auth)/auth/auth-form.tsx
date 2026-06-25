"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { AuthShell } from "@/shells/auth-shell";
import { useLogin } from "@/hooks/use-auth-mutations";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const login = useLogin();
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
        mode: "onChange",
    });

    function onSubmit(values: LoginValues) {
        startTransition(() => {
            login.mutate(values);
        });
    }

    const submitting = isPending || login.isPending;

    return (
        <AuthShell
            title="Log in"
            description="Welcome back. Enter your details to continue."
            footer={
                <>
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/create"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Create one
                    </Link>
                </>
            }
        >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    aria-invalid={fieldState.invalid}
                                    disabled={submitting}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor={field.name}>
                                        Password
                                    </FieldLabel>
                                    <Link
                                        href="/forgot"
                                        className="text-xs font-medium text-emerald-500 underline-offset-4 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        aria-invalid={fieldState.invalid}
                                        disabled={submitting}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer"
                                        tabIndex={-1} // prevents stealing focus
                                    >
                                        {!showPassword ? (
                                            <EyeOff className="size-3.5 hover:text-emerald-600" />
                                        ) : (
                                            <Eye className="size-3.5 text-emerald-500 hover:text-emerald-600" />
                                        )}
                                    </button>
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Field>
                        <Button
                            type="submit"
                            className="w-full transition-all bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                            disabled={submitting}
                        >
                            {submitting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {submitting ? "Logging in..." : "Log in"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </AuthShell>
    );
}