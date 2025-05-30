<template>
  <div>
    <Navbar />

    <div class="flex">
      <!-- Imagen -->
      <div class="w-1/2 hidden md:block lg:flex-1">
        <img class="h-full object-cover" :src="register" alt="register" />
      </div>

      <!-- Formulario -->
      <div class="w-full md:w-1/2 lg:max-w-lg xl:max-w-3xl lg:w-full py-10 px-6 sm:px-10 lg:px-16 xl:px-24 flex items-center">
        <form @submit.prevent="registerUser" class="w-full max-w-2xl space-y-10">
          <div>
            <h2 class="text-3xl font-bold">Nueva Cuenta</h2>
          </div>

          <!-- Datos Personales -->
          <div>
            <h3 class="text-xl font-semibold mt-5 mb-5">Información Personal</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block font-medium mb-1">Nombres</label>
                <input v-model="form.names" type="text" placeholder="Ingresa tus nombres" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Apellidos</label>
                <input v-model="form.surnames" type="text" placeholder="Ingresa tus apellidos" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
              <div>
                <label class="block font-medium mb-1">DUI</label>
                <input v-model="form.identity_number" type="text" placeholder="06184091-8" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Fecha de Nacimiento</label>
                <input v-model="form.birthday_date" type="date" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Teléfono</label>
                <input v-model="form.phone" type="tel" placeholder="7234-5678" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
            </div>
          </div>

          <!-- Usuario -->
          <div>
            <h3 class="text-xl font-semibold mt-5 mb-5">Información de la Cuenta</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block font-medium mb-1">Username</label>
                <input v-model="form.username" type="text" placeholder="Ingresa tu nombre de usuario" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Email</label>
                <input v-model="form.email" type="email" placeholder="Ingresa tu correo electrónico" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
              <div class="md:col-span-2">
                <label class="block font-medium mb-1">Contraseña</label>
                <input v-model="form.password" type="password" placeholder="********" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
            </div>
          </div>

          <!-- Dirección -->
          <div>
            <h3 class="text-xl font-semibold mt-5 mb-5">Dirección</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block font-medium mb-1">Nombre de la Dirección</label>
                <input v-model="form.name" type="text" placeholder="Ej: Casa, Trabajo" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Colonia/Residencial</label>
                <input v-model="form.neighborhood" type="text" placeholder="San Benito" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Calle</label>
                <input v-model="form.street" type="text" placeholder="Av. De La Revolución" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Número</label>
                <input v-model="form.number" type="text" placeholder="123" class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" required />
              </div>
              
              <!-- Selección Geográfica Cascada -->
              <div>
                <label class="block font-medium mb-1">Departamento</label>
                <select 
                  v-model="selectedDepartment" 
                  @change="onDepartmentChange"
                  class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300" 
                  required
                >
                  <option value="">Seleccionar Departamento</option>
                  <option v-for="department in departments" :key="department.id" :value="department.id">
                    {{ department.name }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block font-medium mb-1">Municipio</label>
                <select 
                  v-model="selectedMunicipality" 
                  @change="onMunicipalityChange"
                  :disabled="!selectedDepartment"
                  class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                  required
                >
                  <option value="">Seleccionar Municipio</option>
                  <option v-for="municipality in availableMunicipalities" :key="municipality.id" :value="municipality.id">
                    {{ municipality.name }}
                  </option>
                </select>
              </div>
              
              <div class="md:col-span-2">
                <label class="block font-medium mb-1">Distrito</label>
                <select 
                  v-model="form.district_id" 
                  :disabled="!selectedMunicipality"
                  class="w-full h-11 border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                  required
                >
                  <option value="">Seleccionar Distrito</option>
                  <option v-for="district in availableDistricts" :key="district.id" :value="district.id">
                    {{ district.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Vista Previa de Dirección -->
          <div v-if="form.name || form.street || form.neighborhood" class="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-5 mb-5">
            <h4 class="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <i class="fas fa-map-marker-alt text-primary"></i>
              Vista Previa de Dirección
            </h4>
            <div class="text-sm text-gray-600 space-y-1">
              <div v-if="form.name" class="flex items-center gap-2">
                <i class="fas fa-tag text-xs"></i>
                <span class="font-medium">{{ form.name }}</span>
              </div>
              <div v-if="form.street || form.number" class="flex items-center gap-2">
                <i class="fas fa-road text-xs"></i>
                <span>{{ form.street }} {{ form.number }}</span>
              </div>
              <div v-if="form.neighborhood" class="flex items-center gap-2">
                <i class="fas fa-building text-xs"></i>
                <span>{{ form.neighborhood }}</span>
              </div>
              <div v-if="getSelectedLocationText()" class="flex items-center gap-2">
                <i class="fas fa-map-pin text-xs"></i>
                <span>{{ getSelectedLocationText() }}</span>
              </div>
            </div>
          </div>

          <!-- Botón -->
          <div>
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="btn btn-theme-solid w-full mt-5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
              data-text="Registrar"
            >
              <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
              <span>{{ isSubmitting ? 'Registrando...' : 'Registrar' }}</span>
            </button>
            <p class="text-base mt-4">
              ¿Ya tienes una cuenta?
              <router-link to="/auth/login" class="text-primary font-medium ml-1">Login</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>

    <FooterOne />
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/modules/common/components/Navbar.vue'
import FooterOne from '@/modules/common/components/FooterOne.vue'
import ScrollToTop from '@/modules/common/components/ScrollToTop.vue'
import register from '@/assets/images/bg/register.jpg'
import { registerAction } from '../actions/register.action'
import { getDepartments } from '../../common/actions/fetch-department.action'
import type { ClientRegistrationPayload } from '../interfaces/client-registration-payload'
import type { Department } from '../../common/interfaces/department.interface'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref<ClientRegistrationPayload>({
    names: '',
    surnames: '',
    identity_number: '',
    birthday_date: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    name: '',
    neighborhood: '',
    street: '',
    number: '',
    district_id: 0
})

// Estados para la selección geográfica
const departments = ref<Department[]>([])
const selectedDepartment = ref<number | ''>('')
const selectedMunicipality = ref<number | ''>('')
const isSubmitting = ref(false)

// Computed properties para la selección cascada
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

// Helper function para mostrar la ubicación seleccionada
const getSelectedLocationText = () => {
    const department = departments.value.find(d => d.id === selectedDepartment.value)
    const municipality = availableMunicipalities.value.find(m => m.id === selectedMunicipality.value)
    const district = availableDistricts.value.find(d => d.id === form.value.district_id)
    
    const parts = []
    if (department) parts.push(department.name)
    if (municipality) parts.push(municipality.name)
    if (district) parts.push(district.name)
    
    return parts.join(', ')
}

// Event handlers para la selección cascada
const onDepartmentChange = () => {
    selectedMunicipality.value = ''
    form.value.district_id = 0
}

const onMunicipalityChange = () => {
    form.value.district_id = 0
}

// Función para cargar departamentos
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

const registerUser = async () => {
    // Validar que se haya seleccionado un distrito
    if (!form.value.district_id) {
        alert('Por favor selecciona un distrito')
        return
    }

    isSubmitting.value = true
    try {
        await registerAction(form.value)
        alert('✅ Registro exitoso. Bienvenido!')
        router.push('/')
    } catch (error: any) {
        console.error('Error en el registro:', error)
        alert('❌ Registro fallido: ' + (error?.message || 'Error desconocido'))
    } finally {
        isSubmitting.value = false
    }
}

onMounted(() => {
    fetchDepartments()
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
.btn {
    transition: all 0.3s ease;
}

.btn:disabled {
    transform: none;
}

/* Mejorar la apariencia de los selects deshabilitados */
select:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
}

/* Animación suave para los campos */
input, select {
    transition: all 0.3s ease;
}

input:focus, select:focus {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>