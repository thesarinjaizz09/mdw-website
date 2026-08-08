import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

export function useAddCart() {
    const qc = useQueryClient();

    return useMutation<void, Error, { productId: string; quantity: number }>({
        mutationFn: async ({
            productId,
            quantity,
        }: {
            productId: string;
            quantity: number;
        }) => {
            await fetch("/api/cart/add", {
                method: "POST",
                body: JSON.stringify({
                    productId,
                    quantity,
                }),
            });
        },
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["cart"],
            });
        },
    });
}