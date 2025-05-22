<template>
    <label class="switcher cursor-pointer order-first sm:order-last" @change="changeMode('mode')">
        <input class="hidden" type="checkbox">
        <img class="moon w-[22px] sm:w-7 block dark:hidden" :src="moon" alt="moon">
        <img class="sun w-[22px] sm:w-7 hidden dark:block" :src="sun" alt="sun">
    </label>
</template>

<script setup lang="ts">
import moon from '@/assets/images/icon/simple-sun.svg'
import sun from '@/assets/images/icon/simple-light.svg'

function changeMode(mode: string) {
    switch (mode) {
        case 'mode':
            if (document.documentElement.className.includes("dark")) {
                document.documentElement.className = 'light'
            } else {
                document.documentElement.className = 'dark'
            }
            break;
    }
}


</script>
