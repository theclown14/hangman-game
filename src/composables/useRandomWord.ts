import { getRandomName } from '@/api/getRandomName';

import { onMounted, ref  } from 'vue';

export const useRandomWord = () => {
    const word = ref('');

    const getRandomWord = async () => {
    try {
            const name = await getRandomName();
            word.value = name.toLowerCase();
        } catch (e) {
            console.error(e);
            word.value = '';
        }
    };
    onMounted(() => {
        getRandomWord();
    })
    
    return{
        word,
        getRandomWord
    }
}