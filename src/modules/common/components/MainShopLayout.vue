<template>
    <div>
        <Navbar />


        <router-view />


        <FooterOne />

        <ScrollToTop /><!-- // TODO  Verificar por que el scroll to top no funciona-->

    </div>
</template>

<script setup lang="ts">
import FooterOne from '@/modules/common/components/FooterOne.vue';
import Navbar from '@/modules/common/components/Navbar.vue';
import ScrollToTop from '@/modules/common/components/ScrollToTop.vue';


</script>
