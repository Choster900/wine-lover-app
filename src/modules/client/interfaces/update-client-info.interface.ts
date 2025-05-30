import type { ClientExtended, User } from '@/modules/auth/interfaces'
import type { ClientRegistrationPayload } from '@/modules/auth/interfaces/client-registration-payload'

export interface ClientPayload
    extends Omit<
        Partial<ClientRegistrationPayload>,
        'password' | 'name' | 'neighborhood' | 'street' | 'district_id'
    > {}

export interface UpdateClientResponse {
    user: User
    client: ClientExtended
}
