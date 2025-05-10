<template>
    <div class="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
        <h4 class="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Item Type</h4>
        <div class="grid gap-5">
            <label class="categoryies-iteem flex items-center gap-[10px]">
                <input class="appearance-none hidden" type="radio" name="item-type">
                <span
                    class="w-[18px] h-[18px] rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                    <svg class="duration-300 opacity-0" width="10" height="10" viewBox="0 0 10 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" rx="5" fill="#BB976D" />
                    </svg>
                </span>
                <span
                    class="sm:text-lg text-title duration-300 dark:text-white block sm:leading-none transform translate-y-[1px] select-none text">Regular</span>
            </label>
            <label class="categoryies-iteem flex items-center gap-[10px]">
                <input class="appearance-none hidden" type="radio" name="item-type">
                <span
                    class="w-[18px] h-[18px] rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                    <svg class="duration-300 opacity-0" width="10" height="10" viewBox="0 0 10 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" rx="5" fill="#BB976D" />
                    </svg>
                </span>
                <span
                    class="text-title dark:text-white block sm:leading-none transform translate-y-[1px] duration-300 select-none">Premium</span>
            </label>
            <label class="categoryies-iteem flex items-center gap-[10px]">
                <input class="appearance-none hidden" type="radio" name="item-type">
                <span
                    class="w-[18px] h-[18px] rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                    <svg class="duration-300 opacity-0" width="10" height="10" viewBox="0 0 10 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" rx="5" fill="#BB976D" />
                    </svg>
                </span>
                <span
                    class="text-title dark:text-white block sm:leading-none transform translate-y-[1px] duration-300 select-none">Vintage</span>
            </label>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
