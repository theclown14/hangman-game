<script setup lang="ts">
import GameFigure from './components/GameFigure.vue';
import GameWrongLetters from './components/GameWrongLetters.vue';
import GameWord from './components/GameWord.vue';
import GamePopup from './components/GamePopup.vue';
import GameNotification from './components/GameNotification.vue';

import { useRandomWord } from './composables/useRandomWord';
import { useLetters } from './composables/useLetters';
import { useNotification } from './composables/useNotification';

import { computed, ref, watch } from 'vue';

const { word, getRandomWord } = useRandomWord();
const { letters, correctLetters, wrongLetters, isWin, isLose, addLetter } =
    useLetters(word);
const { notification, showNotification } = useNotification();

const popup = ref<InstanceType<typeof GamePopup> | null>(null);

const restart = async () => {
    await getRandomWord();
    letters.value = [];
    popup.value?.close();
};
watch(wrongLetters, () => {
    if (isLose.value) {
        popup.value?.open('lose');
    }
});

watch(correctLetters, () => {
    if (isWin.value) {
        popup.value?.open('win');
    }
});

window.addEventListener('keydown', ({ key }) => {
    if (isLose.value || isWin.value) {
        return;
    }
    if (letters.value.includes(key)) {
        showNotification();
    }

    addLetter(key);
});
</script>

<template>
    <div id="app">
        <h1>Виселица</h1>
        <p>Отгадайте имя - введите букву</p>
        <div class="game-container">
            <GameFigure :wrong-letters-count="wrongLetters.length" />
            <GameWrongLetters :wrong-letters="wrongLetters" />
            <GameWord :word="word" :correct-letters="correctLetters" />
        </div>
        <GamePopup ref="popup" :word="word" @restart="restart" />
        <GameNotification ref="notification" :word="word" />
    </div>
</template>

<style scoped></style>
