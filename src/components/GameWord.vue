<script setup lang="ts">
interface Props {
    word: string;
    correctLetters: string[];
}

defineProps<Props>();
</script>

<template>
    <div class="word">
        <span v-for="(letter, idx) in word" :key="idx" class="letter">
            {{ correctLetters.includes(letter) ? letter : '' }}
        </span>
    </div>
</template>
