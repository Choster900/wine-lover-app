<template>
    <div>
        <Navbar />


        <router-view />


        <FooterOne />

        <ScrollToTop /><!-- // TODO  Verificar por que el scroll to top no funciona-->

    </div>
</template>

<script setup>
import Footer from '@/modules/common/components/Footer.vue';
import FooterOne from '@/modules/common/components/FooterOne.vue';
import Navbar from '@/modules/common/components/Navbar.vue';
import ScrollToTop from '@/modules/common/components/ScrollToTop.vue';


</script>
