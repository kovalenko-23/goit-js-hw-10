const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountry(name) {
    return fetch(`${BASE_URL}${name}?fields=name;capital;flag;population;languages`)
        .then(response => {
            return response.json();
        })
};

export default {fetchCountry}