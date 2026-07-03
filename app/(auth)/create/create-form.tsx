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
import { useRegister } from "@/hooks/use-auth-mutations";

// Schema aligned with backend expectations
const registerSchema = z
    .object({
        userfName: z.string().min(2, "First name must be at least 2 characters"),
        userlName: z.string().min(2, "Last name must be at least 2 characters").optional().or(z.literal("")),
        userEmail: z
            .string()
            .min(1, "Email is required")
            .email("Enter a valid email"),
        userPhone: z
            .string()
            .min(10, "Enter a valid phone number")
            .max(15, "Enter a valid phone number")
            .optional()
            .or(z.literal("")),
        userPassword: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.userPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const register = useRegister();
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)


    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            userfName: "",
            userlName: "",
            userEmail: "",
            userPhone: "",
            userPassword: "",
            confirmPassword: "",
        },
    });

    function onSubmit(values: RegisterValues) {
        startTransition(() => {
            register.mutate({
                userfName: values.userfName,
                userlName: values.userlName || undefined,
                userEmail: values.userEmail,
                userPhone: values.userPhone || undefined,
                userPassword: values.userPassword,
            });
        });
    }

    const submitting = isPending || register.isPending;

    return (
        <AuthShell
            title="Create an account"
            description="Sign up to start ordering your medicines."
            footer={
                <>
                    Already have an account?{" "}
                    <Link
                        href="/auth"
                        className="font-medium text-emerald-500 underline-offset-4 hover:underline"
                    >
                        Log in
                    </Link>
                </>
            }
            showCompany={false}
        >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <FieldGroup>
                <Controller
                    name="userfName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                First Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="text"
                                autoComplete="given-name"
                                placeholder="John"
                                aria-invalid={fieldState.invalid}
                                disabled={submitting}
                                className="border border-gray-500"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                {/* Optional Last Name */}
                <Controller
                    name="userlName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Last Name (optional)
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="text"
                                autoComplete="family-name"
                                placeholder="Doe"
                                aria-invalid={fieldState.invalid}
                                disabled={submitting}
                                className="border border-gray-500"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                    <div className="grid grid-cols-2 gap-2">
                <Controller
                    name="userEmail"
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
                                placeholder="john@example.com"
                                aria-invalid={fieldState.invalid}
                                disabled={submitting}
                                className="border border-gray-500"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="userPhone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Phone
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="tel"
                                autoComplete="tel"
                                placeholder="9876543210"
                                aria-invalid={fieldState.invalid}
                                disabled={submitting}
                                className="border border-gray-500"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                <Controller
                    name="userPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <div className="flex items-center justify-between">
                                <FieldLabel htmlFor={field.name}>
                                    Password
                                </FieldLabel>
                            </div>
                            <div className="relative">
                                <Input
                                    {...field}
                                    id={field.name}
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    aria-invalid={fieldState.invalid}
                                    disabled={submitting}
                                    className="border border-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer"
                                    tabIndex={-1}
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

                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel htmlFor={field.name}>
                                            Confirm Password
                                        </FieldLabel>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type={showPassword2 ? "text" : "password"}
                                            autoComplete="confirm-password"
                                            placeholder="••••••••"
                                            aria-invalid={fieldState.invalid}
                                            disabled={submitting}
                                            className="border border-gray-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword2((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer"
                                            tabIndex={-1} // prevents stealing focus
                                        >
                                            {!showPassword2 ? (
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
                    </div>
                </FieldGroup>

                <Button
                    type="submit"
                    className="w-full transition-all bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                    disabled={submitting}
                >
                    {submitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {submitting ? "Creating account..." : "Create account"}
                </Button>
            </form>
        </AuthShell>
    );
}
