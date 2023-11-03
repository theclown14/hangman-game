export const getRandomName = async ()  => {
        const response = await  fetch (
            'https://api.randomdatatools.ru/?unescaped=false&params=FirstName'
        );
        const data = await response.json();
        return data.FirstName

};