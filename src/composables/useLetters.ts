import { ref, computed, type Ref  } from 'vue';

export const useLetters = (word: Ref<string>) => {
    const letters = ref<string[]>([]);
    const correctLetters = computed(() =>
        letters.value.filter((letter) => word.value.includes(letter))
    );
    const wrongLetters = computed(() =>
        letters.value.filter((letter) => !word.value.includes(letter))
    );

    const isLose = computed(() => wrongLetters.value.length >= 6);
    const isWin = computed(() =>
        [...word.value].every((letter) => correctLetters.value.includes(letter))
    );
    const addLetter = (key: string) => {
        if (/[а-яФ-ЯёЁ]/.test(key)) {
            letters.value.push(key.toLowerCase());
        }
    }
    
    return{
        letters,
        correctLetters,
        wrongLetters,
        isLose,
        isWin,
        addLetter

    }
}