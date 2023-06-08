const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const SECOND_URL = 'https://api.thecatapi.com/v1/images/search';
const INFORMATION_URL = 'https://api.thecatapi.com/v1/images/'
const KEY_API = 'live_bKUYwkxly4uXAhWwrcFux2VWh0pILBNKrpTV5FNyYlDq4h09zGjldboOQ7otZtUi';

const option = {
    headers: {
        'x-api-key': KEY_API,
    }
};

function fetchCatApi() {
    return fetch(BASE_URL, option).then(r => r.json());
}

function fetchCatByBreed(breedId) {
    return fetch(`${SECOND_URL}?breed_ids=${breedId}`, option).then(r => r.json());

}

export { fetchCatApi, fetchCatByBreed };

