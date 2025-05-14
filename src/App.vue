<template>
  <RouterView></RouterView>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchUserAction } from '@/modules/auth/actions/fetch-user.action'

onMounted(() => {
    fetchUserAction()
})
</script>
