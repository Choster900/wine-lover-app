import { useQuery } from '@tanstack/vue-query'
import type { Manufacturer } from '../interfaces/product.interface'
import { fetchManufacturerAction } from '../actions/fetch-manufacturer.action'

export function useManufacturersQuery() {
    return useQuery<Manufacturer[], Error, Manufacturer[], string[]>({
        queryKey: ['manufacturer'],
        queryFn: async () => {
            const response = await fetchManufacturerAction()
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    })
}
