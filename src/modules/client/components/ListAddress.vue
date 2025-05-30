<template>
    <!-- Header Banner -->
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Direcciones</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li><router-link to="/my-profile">Mi Cuenta</router-link></li>
                <li>/</li>
                <li class="text-primary">Direcciones</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100" data-aos="fade-up">
        <div class="container-fluid">
            <div
                class="max-w-[1720px] mx-auto flex items-start gap-8 md:gap-12 2xl:gap-24 flex-col md:flex-row my-profile-navtab">
                <!-- Sidebar Navigation -->
                <div class="w-full md:w-[200px] lg:w-[300px] flex-none">
                    <ProfileTab />
                </div>

                <!-- Main Content -->
                <div class="w-full md:w-auto md:flex-1">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Add New Address Form -->
                        <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-title dark:text-white">
                                    {{ editingAddress ? 'Editar Dirección' : 'Agregar Nueva Dirección' }}
                                </h3>
                            </div>

                            <!-- Address Form -->
                            <form @submit.prevent="submitForm" class="space-y-5">
                                <div class="mb-5">
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                        Nombre de la Dirección
                                    </label>
                                    <input
                                        v-model="addressForm.name"
                                        class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                        type="text"
                                        placeholder="Ej: Casa, Oficina, Casa de mamá"
                                        required
                                    >
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    <div>
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                            Calle
                                        </label>
                                        <input
                                            v-model="addressForm.street"
                                            class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                            type="text"
                                            placeholder="Nombre de la calle"
                                            required
                                        >
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                            Número
                                        </label>
                                        <input
                                            v-model="addressForm.number"
                                            class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                            type="text"
                                            placeholder="Número de casa"
                                            required
                                        >
                                    </div>
                                </div>

                                <div class="mb-5">
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                        Colonia/Barrio
                                    </label>
                                    <input
                                        v-model="addressForm.neighborhood"
                                        class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                        type="text"
                                        placeholder="Nombre de la colonia o barrio"
                                        required
                                    >
                                </div>

                                <!-- Location Selectors -->
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                    <div>
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                            Departamento
                                        </label>
                                        <select
                                            v-model="selectedDepartment"
                                            @change="onDepartmentChange"
                                            class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                            required
                                        >
                                            <option value="">Seleccionar</option>
                                            <option v-for="department in departments" :key="department.id" :value="department.id">
                                                {{ department.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                            Municipio
                                        </label>
                                        <select
                                            v-model="selectedMunicipality"
                                            @change="onMunicipalityChange"
                                            :disabled="!selectedDepartment"
                                            class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            required
                                        >
                                            <option value="">Seleccionar</option>
                                            <option v-for="municipality in availableMunicipalities" :key="municipality.id" :value="municipality.id">
                                                {{ municipality.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                            Distrito
                                        </label>
                                        <select
                                            v-model="addressForm.district_id"
                                            :disabled="!selectedMunicipality"
                                            class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            required
                                        >
                                            <option value="">Seleccionar</option>
                                            <option v-for="district in availableDistricts" :key="district.id" :value="district.id">
                                                {{ district.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                        Referencia (Opcional)
                                    </label>
                                    <textarea
                                        v-model="addressForm.reference"
                                        class="w-full h-20 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 outline-none transition-all duration-300 resize-none"
                                        placeholder="Puntos de referencia adicionales..."
                                    ></textarea>
                                </div>

                                <div class="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        :disabled="isSubmitting"
                                        class="flex-1 h-12 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <i class="fas" :class="isSubmitting ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                                        <span>{{ editingAddress ? 'Actualizar' : 'Guardar' }} Dirección</span>
                                    </button>
                                    <button
                                        v-if="editingAddress"
                                        type="button"
                                        @click="cancelEdit"
                                        class="px-6 h-12 bg-gray-500 hover:bg-gray-600 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <i class="fas fa-times"></i>
                                        <span>Cancelar</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Saved Addresses -->
                        <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <i class="fas fa-map-marked-alt"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-title dark:text-white">Direcciones Guardadas</h3>
                            </div>

                            <div v-if="isLoading" class="flex justify-center items-center py-12">
                                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>

                            <div v-else-if="addresses.length === 0" class="py-12 text-center">
                                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <i class="fas fa-map-marker-alt text-2xl"></i>
                                </div>
                                <h4 class="text-lg font-medium text-gray-600 dark:text-gray-400">No hay direcciones guardadas</h4>
                                <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                    Agrega una dirección para realizar entregas más rápido
                                </p>
                            </div>

                            <div v-else class="space-y-4">
                                <div
                                    v-for="address in addresses"
                                    :key="address.id"
                                    class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary hover:shadow-md transition-all duration-300"
                                >
                                    <div class="flex justify-between items-start">
                                        <div class="flex items-start gap-3 flex-1">
                                            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                                                <i class="fas fa-home"></i>
                                            </div>
                                            <div class="flex-1">
                                                <h4 class="font-semibold text-title dark:text-white mb-2">
                                                    {{ address.name }}
                                                </h4>
                                                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                                    <div class="flex items-center gap-2">
                                                        <i class="fas fa-road text-xs"></i>
                                                        <span>{{ address.street }} {{ address.number }}</span>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <i class="fas fa-building text-xs"></i>
                                                        <span>{{ address.neighborhood }}</span>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <i class="fas fa-map-pin text-xs"></i>
                                                        <span>{{ address.district }}</span>
                                                    </div>
                                                    <div v-if="address.reference" class="flex items-center gap-2">
                                                        <i class="fas fa-info-circle text-xs"></i>
                                                        <span>{{ address.reference }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex gap-2 ml-4">
                                            <button
                                                @click="editAddress(address)"
                                                class="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                                                title="Editar dirección"
                                            >
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button
                                                @click="deleteAddress(address.id)"
                                                class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                                                title="Eliminar dirección"
                                            >
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <i class="fas fa-shield-alt text-green-500"></i>
                                    <span>Tus direcciones están protegidas y solo se usan para entregas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'

import { getAddresses, addAddress, updateAddress, removeAddress } from '../actions/fetch-addresses.action'
import { getDepartments } from '@/modules/common/actions/fetch-department.action'
import type { Address, AddressPayload } from '../interfaces/addresses.interface'
import type { Department } from '../interfaces/department.interface'
import ProfileTab from './ProfileTab.vue'

const addresses = ref<Address[]>([])
const departments = ref<Department[]>([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const editingAddress = ref<Address | null>(null)

// Form data
const addressForm = ref<AddressPayload>({
    name: '',
    neighborhood: '',
    street: '',
    number: '',
    reference: '',
    district_id: 0
})

// Location selectors
const selectedDepartment = ref<number | ''>('')
const selectedMunicipality = ref<number | ''>('')

// Computed properties for cascading selects
const availableMunicipalities = computed(() => {
    if (!selectedDepartment.value) return []
    const department = departments.value.find(d => d.id === selectedDepartment.value)
    return department?.municipalities || []
})

const availableDistricts = computed(() => {
    if (!selectedMunicipality.value) return []
    const municipality = availableMunicipalities.value.find(m => m.id === selectedMunicipality.value)
    return municipality?.districts || []
})

// Event handlers for cascading selects
const onDepartmentChange = () => {
    selectedMunicipality.value = ''
    addressForm.value.district_id = 0
}

const onMunicipalityChange = () => {
    addressForm.value.district_id = 0
}

// Form functions
const resetForm = () => {
    addressForm.value = {
        name: '',
        neighborhood: '',
        street: '',
        number: '',
        reference: '',
        district_id: 0
    }
    selectedDepartment.value = ''
    selectedMunicipality.value = ''
    editingAddress.value = null
}

const editAddress = (address: Address) => {
    editingAddress.value = address
    addressForm.value = {
        name: address.name,
        neighborhood: address.neighborhood,
        street: address.street,
        number: address.number,
        reference: address.reference || '',
        district_id: 0 // We'll need to find this from the district name
    }
    
    for (const department of departments.value) {
        for (const municipality of department.municipalities) {
            const district = municipality.districts.find(d => d.name === address.district)
            if (district) {
                selectedDepartment.value = department.id
                selectedMunicipality.value = municipality.id
                addressForm.value.district_id = district.id
                break
            }
        }
    }
}

const cancelEdit = () => {
    resetForm()
}

const submitForm = async () => {
    if (!addressForm.value.district_id) {
        alert('Por favor selecciona un distrito')
        return
    }

    isSubmitting.value = true
    try {
        let result
        if (editingAddress.value) {
            result = await updateAddress(editingAddress.value.id, addressForm.value)
        } else {
            result = await addAddress(addressForm.value)
        }

        if (result) {
            alert(`✅ Dirección ${editingAddress.value ? 'actualizada' : 'registrada'} exitosamente.`)
            resetForm()
            await fetchAddresses()
        } else {
            alert(`❌ Ocurrió un error al ${editingAddress.value ? 'actualizar' : 'registrar'} la dirección. Intenta nuevamente.`)
        }
    } catch (error) {
        console.error('Error al guardar la dirección:', error)
        alert(`❌ Ocurrió un error al ${editingAddress.value ? 'actualizar' : 'registrar'} la dirección. Intenta nuevamente.`)
    } finally {
        isSubmitting.value = false
    }
}

const deleteAddress = async (addressId: number) => {
    if (confirm('¿Estás seguro de eliminar esta dirección?')) {
        try {
            const result = await removeAddress(addressId)
            if (result) {
                alert('✅ Dirección eliminada exitosamente.')
                await fetchAddresses()
            } else {
                alert('❌ Ocurrió un error al eliminar la dirección.')
            }
        } catch (error) {
            console.error('Error al eliminar la dirección:', error)
            alert('❌ Ocurrió un error al eliminar la dirección.')
        }
    }
}

// Data fetching functions
const fetchAddresses = async () => {
    isLoading.value = true
    try {
        const data = await getAddresses()
        if (data) {
            addresses.value = data
        } else {
            console.error('Error al obtener las direcciones')
        }
    } catch (error) {
        console.error('Error al obtener las direcciones:', error)
    } finally {
        isLoading.value = false
    }
}

const fetchDepartments = async () => {
    try {
        const data = await getDepartments()
        if (data) {
            departments.value = data
        } else {
            console.error('Error al obtener los departamentos')
        }
    } catch (error) {
        console.error('Error al obtener los departamentos:', error)
    }
}

onMounted(() => {
    Aos.init()
    fetchAddresses()
    fetchDepartments()
})
</script>

<style scoped>
.perspective-card {
    perspective: 1000px;
}

.card-face {
    backface-visibility: hidden;
    transition: transform 0.6s;
}

.card-back {
    transform: rotateY(180deg);
}

.rotate-card {
    transform: rotateY(180deg);
}
</style>