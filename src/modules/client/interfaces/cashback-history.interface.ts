import type { CashbackHistory } from '@/modules/auth/interfaces'
import type { Links, Meta } from '@/modules/products/interfaces/all-products-response.interface'

export interface CurrentCashbackHistory {
    data: CashbackHistory[]
    links: Links
    meta: Meta
}
