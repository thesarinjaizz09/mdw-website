"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    authApi,
    AuthApiError,
    type LoginInput,
    type RegisterInput,
    type ForgotPasswordInput,
    type ResetPasswordInput,
} from "@/lib/apu/auth";
import { useAuth } from "@/providers/auth-provider";

function errorMessage(err: unknown) {
    if (err instanceof AuthApiError) return err.message;
    return "Something went wrong. Please try again.";
}

export function useLogin() {
    const router = useRouter();
    const { setUser } = useAuth();

    return useMutation({
        mutationFn: (input: LoginInput) => authApi.login(input),
        onSuccess: (data) => {
            setUser(data.user);
            toast.success("Welcome back.");
            router.push("/");
            router.refresh();
        },
        onError: (err) => {
            toast.error(errorMessage(err));
        },
    });
}

export function useRegister() {
    const router = useRouter();
    const { setUser } = useAuth();

    return useMutation({
        mutationFn: (input: RegisterInput) =>
            authApi.register(input),
        onSuccess: (data) => {
            setUser(data.user);
            toast.success("Account created.");
            router.push("/");
            router.refresh();
        },
        onError: (err) => {
            toast.error(errorMessage(err));
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (input: ForgotPasswordInput) =>
            authApi.forgotPassword(input),
        onSuccess: () => {
            toast.success("Check your email for reset instructions.");
        },
        onError: (err) => {
            toast.error(errorMessage(err));
        },
    });
}

export function useResetPassword() {
    const router = useRouter();

    return useMutation({
        mutationFn: (input: ResetPasswordInput) =>
            authApi.resetPassword(input),
        onSuccess: () => {
            toast.success("Password updated. Please log in.");
            router.push("/auth");
        },
        onError: (err) => {
            toast.error(errorMessage(err));
        },
    });
}