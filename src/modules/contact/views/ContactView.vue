<template>
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Contacto</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li class="text-primary">Contacto</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100" data-aos="fade-up">
        <div class="container">
            <!-- Introducción -->
            <div class="max-w-4xl mx-auto text-center mb-10" data-aos="fade-up">
                <h3 class="text-3xl md:text-4xl font-bold text-title dark:text-white mb-5">
                    ¡Estamos aquí para ayudarte!
                </h3>
                <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    ¿Tienes alguna pregunta sobre nuestros productos, necesitas ayuda con tu pedido o simplemente quieres conocer más sobre nosotros?
                    Nos encanta escuchar de nuestros clientes. Contáctanos a través de cualquiera de nuestros canales.
                </p>
            </div>

            <!-- Redes Sociales -->
            <div class="text-center mb-10" data-aos="fade-up">

                <h4 class="text-2xl font-semibold text-title dark:text-white mb-8">Síguenos en Redes Sociales</h4>
                <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    Mantente al día con nuestras últimas novedades, promociones exclusivas y contenido especial.
                    ¡Únete a nuestra comunidad!
                </p>

                <!-- Estadísticas de redes sociales -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                    <div class="text-center p-6 bg-white dark:bg-dark-secondary rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
                        <a href="https://www.facebook.com/profile.php?id=61576316712572" target="_blank" class="text-blue-600 text-3xl mb-2">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <div class="text-2xl font-bold text-title dark:text-white">25K+</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Seguidores</div>
                    </div>

                    <div class="text-center p-6 bg-white dark:bg-dark-secondary rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
                        <a href="https://www.instagram.com/clubvinoslicores/" target="_blank" class="text-pink-600 text-3xl mb-2">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <div class="text-2xl font-bold text-title dark:text-white">18K+</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Seguidores</div>
                    </div>

                    <div class="text-center p-6 bg-white dark:bg-dark-secondary rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
                        <a href="https://x.com/AmantesVinoX" target="_blank" class="text-black dark:text-white text-3xl mb-2">
                            <i class="fab fa-x-twitter"></i>
                        </a>
                        <div class="text-2xl font-bold text-title dark:text-white">12K+</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Seguidores</div>
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import { onMounted, ref } from 'vue'
import Aos from 'aos'

// Estado del formulario
const form = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
})

const isSubmitting = ref(false)

// Función para enviar el formulario
const submitForm = async () => {
    isSubmitting.value = true

    try {
        // Simular envío del formulario
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Aquí iría la lógica real de envío
        console.log('Formulario enviado:', form.value)

        // Mostrar mensaje de éxito
        alert('¡Mensaje enviado exitosamente! Te responderemos pronto.')

        // Limpiar formulario
        form.value = {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        }
    } catch (error) {
        console.error('Error al enviar formulario:', error)
        alert('Error al enviar el mensaje. Por favor, intenta nuevamente.')
    } finally {
        isSubmitting.value = false
    }
}

onMounted(() => {
    Aos.init()
})
</script>

<style scoped>
/* Animaciones adicionales para las redes sociales */
@keyframes pulse-social {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.group:hover {
    animation: pulse-social 0.6s ease-in-out;
}
</style>
