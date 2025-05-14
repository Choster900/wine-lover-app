import { useQuery } from '@tanstack/vue-query'
import { fetchProductsAction, fetchProductByIdAction } from '../actions/fetch-products.action'
import type { Product } from '../interfaces/product.interface'

export function useProductsQuery() {
    return useQuery<Product[], Error, Product[], string[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetchProductsAction()
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    })
}

export function useProductByIdQuery(productId: string) {
    return useQuery<Product, Error, Product, [string, string]>({
        queryKey: ['product', productId],
        queryFn: async () => {
            const response = await fetchProductByIdAction(productId)
            return response.data
        },
        enabled: !!productId,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    })
}
