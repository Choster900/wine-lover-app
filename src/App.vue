<template>
    <RouterView></RouterView>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchUserFromToken } from './modules/auth/actions/auth.action';

onMounted(() => {
    fetchUserFromToken()
})
</script>
