<template>
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">
                {{ isLoading ? 'Cargando...' : review?.title || 'Reseña' }}
            </h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li><router-link to="/reviews">Blog</router-link></li>
                <li>/</li>
                <li class="text-primary">{{ isLoading ? 'Cargando...' : truncateTitle(review?.title || '') }}</li>
            </ul>
        </div>
    </div>

    <div class="py-16" data-aos="fade-up">
        <div class="container">
            <div class="max-w-4xl mx-auto">
                <!-- Estado de carga -->
                <div v-if="isLoading" class="flex justify-center items-center py-20">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>

                <!-- Error -->
                <div v-else-if="error" class="text-center py-20">
                    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <i class="fas fa-exclamation-triangle text-2xl"></i>
                    </div>
                    <h4 class="text-lg font-medium text-gray-600 dark:text-gray-400">Error al cargar la reseña</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        {{ error }}
                    </p>
                    <router-link
                        to="/reviews"
                        class="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300"
                    >
                        <i class="fas fa-arrow-left"></i>
                        <span>Volver a reseñas</span>
                    </router-link>
                </div>

                <!-- Contenido de la reseña -->
                <div v-else-if="review" class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden">
                    <div class="relative h-[300px] md:h-[400px] overflow-hidden">
                        <img
                            :src="baseUrl + '/' + review.cover_image"
                            :alt="review.title"
                            class="w-full h-full object-cover"
                            @error="handleImageError"
                        >
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        <div class="absolute bottom-0 left-0 w-full p-6 text-white">
                            <div class="flex items-center gap-3 mb-2">
                                <div v-if="review.username" class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <i class="fas fa-user text-sm"></i>
                                    </div>
                                    <span>{{ review.username }}</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <i class="fas fa-calendar-alt text-sm"></i>
                                    <span>{{ formatDate(review.created_at) }}</span>
                                </div>
                            </div>
                            <h1 class="text-2xl text-white border-black md:text-3xl font-bold">{{ review.title }}</h1>
                        </div>
                    </div>

                    <div class="p-6 md:p-8">
                        <div class="flex justify-between items-center mb-6">
                            <router-link
                                to="/reviews"
                                class="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                            >
                                <i class="fas fa-arrow-left"></i>
                                <span>Volver a reseñas</span>
                            </router-link>
                        </div>

                        <div class="text-justify max-w-none dark:prose-invert mb-8" v-html="sanitizedContent"></div>

                        <hr class="border-gray-200 dark:border-gray-700 my-8">

                        <!-- Sección de comentarios -->
                        <div id="comments" class="mt-10">
                            <h3 class="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <i class="fas fa-comments text-primary"></i>
                                Comentarios
                                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    ({{ totalCommentsCount }})
                                </span>
                            </h3>

                            <!-- Formulario de comentarios principales -->
                            <div v-if="review.comments_available" class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
                                <h4 class="text-lg font-medium mb-4">Deja tu comentario</h4>
                                <form @submit.prevent="submitComment">
                                    <div class="mb-4">
                                        <textarea
                                            v-model="commentForm.content"
                                            rows="4"
                                            placeholder="Escribe tu comentario aquí..."
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                                            :disabled="isSubmitting"
                                        ></textarea>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <button
                                            type="submit"
                                            class="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                                            :disabled="isSubmitting || !commentForm.content.trim()"
                                        >
                                            <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
                                            <i v-else class="fas fa-paper-plane"></i>
                                            <span>{{ isSubmitting ? 'Enviando...' : 'Comentar' }}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <!-- Lista de comentarios -->
                            <div v-if="mainComments.length > 0" class="space-y-6">
                                <div
                                    v-for="comment in mainComments"
                                    :key="comment.id"
                                    class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm"
                                >
                                    <!-- Comentario principal -->
                                    <div class="flex items-start gap-3">
                                        <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                            <i class="fas fa-user text-gray-500 dark:text-gray-400"></i>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center justify-between mb-2">
                                                <h5 class="font-medium">{{ comment.by }}</h5>
                                                <span class="text-xs text-gray-500">{{ formatDate(comment.created_at) }}</span>
                                            </div>
                                            <p class="text-gray-700 dark:text-gray-300 mb-3">{{ comment.content }}</p>

                                            <!-- Acciones de comentario -->
                                            <div class="flex items-center gap-4">
                                                <button 
                                                    @click="toggleReplyForm(comment.id)"
                                                    class="text-sm text-gray-500 hover:text-primary flex items-center gap-1 transition-colors"
                                                >
                                                    <i class="fas fa-reply"></i>
                                                    <span>Responder</span>
                                                </button>
                                                
                                                <!-- Mostrar número de respuestas si las hay -->
                                                <span v-if="getCommentReplies(comment.id).length > 0" class="text-sm text-gray-500">
                                                    {{ getCommentReplies(comment.id).length }} 
                                                    {{ getCommentReplies(comment.id).length === 1 ? 'respuesta' : 'respuestas' }}
                                                </span>
                                            </div>

                                            <!-- Formulario de respuesta -->
                                            <div v-if="replyingTo === comment.id" class="mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                                <form @submit.prevent="submitReply(comment.id)">
                                                    <div class="mb-3">
                                                        <textarea
                                                            v-model="replyForm.content"
                                                            rows="3"
                                                            :placeholder="`Responder a ${comment.by}...`"
                                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white resize-none text-sm"
                                                            :disabled="isSubmittingReply"
                                                        ></textarea>
                                                    </div>
                                                    <div class="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            @click="cancelReply"
                                                            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                                            :disabled="isSubmittingReply"
                                                        >
                                                            Cancelar
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            class="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
                                                            :disabled="isSubmittingReply || !replyForm.content.trim()"
                                                        >
                                                            <i v-if="isSubmittingReply" class="fas fa-spinner fa-spin"></i>
                                                            <i v-else class="fas fa-reply"></i>
                                                            <span>{{ isSubmittingReply ? 'Enviando...' : 'Responder' }}</span>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Respuestas al comentario -->
                                    <div v-if="getCommentReplies(comment.id).length > 0" class="mt-4 ml-8 space-y-4">
                                        <div
                                            v-for="reply in getCommentReplies(comment.id)"
                                            :key="reply.id"
                                            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-primary/30"
                                        >
                                            <div class="flex items-start gap-3">
                                                <div class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                                                    <i class="fas fa-user text-gray-500 dark:text-gray-400 text-sm"></i>
                                                </div>
                                                <div class="flex-1">
                                                    <div class="flex items-center justify-between mb-2">
                                                        <h6 class="font-medium text-sm">{{ reply.by }}</h6>
                                                        <span class="text-xs text-gray-500">{{ formatDate(reply.created_at) }}</span>
                                                    </div>
                                                    <p class="text-gray-700 dark:text-gray-300 text-sm">{{ reply.content }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Sin comentarios -->
                            <div v-else-if="review.comments_available" class="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                    <i class="fas fa-comments text-xl"></i>
                                </div>
                                <h5 class="text-lg font-medium text-gray-600 dark:text-gray-400">No hay comentarios aún</h5>
                                <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                    Sé el primero en comentar esta reseña
                                </p>
                            </div>

                            <!-- Comentarios deshabilitados -->
                            <div v-else class="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                    <i class="fas fa-comment-slash text-xl"></i>
                                </div>
                                <h5 class="text-lg font-medium text-gray-600 dark:text-gray-400">Comentarios deshabilitados</h5>
                                <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                    Los comentarios no están disponibles para esta reseña
                                </p>
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
import { useRoute } from 'vue-router'
import DOMPurify from 'dompurify'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import { createCommentAction, fetchReviewByIdAction } from '../actions/fetch-reviews.action'
import type { CommentRequest, Review } from '../interfaces/reviews.interface'

const route = useRoute()
const baseUrl = import.meta.env.VITE_BACKEND_STORAGE_URL

const review = ref<Review | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const isSubmitting = ref(false)
const isSubmittingReply = ref(false)
const replyingTo = ref<number | null>(null)

const commentForm = ref({
    content: ''
})

const replyForm = ref({
    content: ''
})

const sanitizedContent = computed(() => {
    if (!review.value?.content) return ''
    return DOMPurify.sanitize(review.value.content)
})

// Separar comentarios principales de respuestas
const mainComments = computed(() => {
    if (!review.value?.comments) return []
    return review.value.comments.filter(comment => !comment.parent || !comment.parent.id)
})

// Función para obtener respuestas de un comentario específico
const getCommentReplies = (commentId: number) => {
    if (!review.value?.comments) return []
    return review.value.comments.filter(comment => comment.parent?.id === commentId)
}

// Contar total de comentarios (principales + respuestas)
const totalCommentsCount = computed(() => {
    return review.value?.comments?.length || 0
})

const loadReview = async (id: number) => {
    isLoading.value = true
    error.value = null

    try {
        const data = await fetchReviewByIdAction(id)
        review.value = data
    } catch (err: any) {
        error.value = err.message || 'Error al cargar la reseña'
        console.error('Error al cargar la reseña:', err)
    } finally {
        isLoading.value = false
    }
}

const initializeFromURL = () => {
    const id = parseInt(route.params.id as string)
    if (isNaN(id)) {
        error.value = 'ID de reseña inválido'
        return
    }

    loadReview(id)
}

const formatDate = (dateString?: string) => {
    if (!dateString) return 'Fecha desconocida'

    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const truncateTitle = (title: string) => {
    return title.length > 30 ? title.substring(0, 30) + '...' : title
}

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement
    target.src = '/placeholder.svg?height=400&width=800&text=Imagen+no+disponible'
}

const submitComment = async () => {
    if (!commentForm.value.content.trim()) return

    const reviewId = parseInt(route.params.id as string)
    if (isNaN(reviewId)) {
        alert('Error: ID de reseña inválido')
        return
    }

    isSubmitting.value = true

    try {
        const commentData: CommentRequest = {
            content: commentForm.value.content.trim()
        }

        await createCommentAction(reviewId, commentData)

        alert('Comentario enviado correctamente.')
        commentForm.value.content = ''

        await loadReview(reviewId)

    } catch (err: any) {
        console.error('Error al enviar comentario:', err)
        alert(err.message || 'Error al enviar el comentario. Inténtalo de nuevo.')
    } finally {
        isSubmitting.value = false
    }
}

const toggleReplyForm = (commentId: number) => {
    if (replyingTo.value === commentId) {
        cancelReply()
    } else {
        replyingTo.value = commentId
        replyForm.value.content = ''
    }
}

const cancelReply = () => {
    replyingTo.value = null
    replyForm.value.content = ''
}

const submitReply = async (parentCommentId: number) => {
    if (!replyForm.value.content.trim()) return

    const reviewId = parseInt(route.params.id as string)
    if (isNaN(reviewId)) {
        alert('Error: ID de reseña inválido')
        return
    }

    isSubmittingReply.value = true

    try {
        const replyData: CommentRequest = {
            content: replyForm.value.content.trim(),
            parent_id: parentCommentId
        }

        await createCommentAction(reviewId, replyData)

        alert('Respuesta enviada correctamente.')
        cancelReply()

        await loadReview(reviewId)

    } catch (err: any) {
        console.error('Error al enviar respuesta:', err)
        alert(err.message || 'Error al enviar la respuesta. Inténtalo de nuevo.')
    } finally {
        isSubmittingReply.value = false
    }
}

onMounted(() => {
    initializeFromURL()
    Aos.init()
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

:deep(.prose) {
    color: inherit;
}

:deep(.prose h2) {
    color: var(--color-primary);
    margin-top: 1.5em;
    margin-bottom: 0.75em;
}

:deep(.prose p) {
    margin-bottom: 1em;
}

:deep(.prose img) {
    border-radius: 0.5rem;
    margin: 1.5em 0;
}

:deep(.prose a) {
    color: var(--color-primary);
    text-decoration: none;
}

:deep(.prose a:hover) {
    text-decoration: underline;
}

:deep(.prose blockquote) {
    border-left-color: var(--color-primary);
    font-style: italic;
    padding-left: 1em;
    margin-left: 0;
    color: rgba(107, 114, 128);
}

.transition-colors {
    transition: color 0.3s ease;
}

.transition-all {
    transition: all 0.3s ease;
}

button:focus {
    outline: none;
}
</style>
