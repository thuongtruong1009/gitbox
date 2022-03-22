<template>
    <div class="loading-container flex justify-center pt-20">
        <div class="wrapper w-64 h-64 relative overflow-hidden">
            <div class="loading-large absolute w-32 h-32 top-15 left-15 rounded-full bg-[#ff6bcb9a]"></div>
            <div class="loading-small absolute w-32 h-32 top-15 left-15 rounded-full bg-[#ff6bcb]"></div>
        </div>
    </div>
</template>

<style scoped>
.loading-large{
    animation: fade-in-animate 1s forwards infinite linear;
}
@keyframes fade-in-animate {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
.loading-small {
    animation: fade-out-animate 1s forwards infinite linear;
}
@keyframes fade-out-animate {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(2);
        opacity: 0;
    }
}
</style>