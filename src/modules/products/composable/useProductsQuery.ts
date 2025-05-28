import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { fetchProductsAction, fetchProductByIdAction } from '../actions/fetch-products.action'
import type { Product } from '../interfaces/product.interface'
import type { GetProductParams } from '../interfaces/get-product-params.interface'

export function useProductsQuery(params: Ref<GetProductParams> | GetProductParams) {
    // Crear un computed para los parámetros si no es un ref
    const queryParams = computed(() => {
        return typeof params === 'object' && 'value' in params ? params.value : params
    })

    return useQuery({
        queryKey: ['products', queryParams],
        queryFn: async () => {
            const response = await fetchProductsAction(queryParams.value)
            return response
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

export function useProductByIdQueryWhitoutDelay(productId: string) {
    return useQuery<Product, Error, Product, [string, string]>({
        queryKey: ['product', productId],
        queryFn: async () => {
            const response = await fetchProductByIdAction(productId)
            return response.data
        },
        enabled: !!productId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}
