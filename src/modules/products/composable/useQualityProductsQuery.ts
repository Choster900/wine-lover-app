import { useQuery } from '@tanstack/vue-query'
import type { YProduct } from '../interfaces/product.interface'
import { fetchQualityProductsAction } from '../actions/fetch-quality-products.action'

export function useQualityProductsQuery() {
    return useQuery<YProduct[], Error, YProduct[], string[]>({
        queryKey: ['qualities'],
        queryFn: async () => {
            const response = await fetchQualityProductsAction()
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    })
}
