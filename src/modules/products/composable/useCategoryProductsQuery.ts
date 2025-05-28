import { useQuery } from '@tanstack/vue-query'
import type { YProduct } from '../interfaces/product.interface'
import { fetchCategoryProductsAction } from '../actions/fetch-category-products.action'

export function useCategoryProductsQuery() {
    return useQuery<YProduct[], Error, YProduct[], string[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await fetchCategoryProductsAction()
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    })
}
