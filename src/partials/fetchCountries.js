const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

async function fetchCountry(name) {
    const responce = await fetch(`${BASE_URL}${name}?fields=name;capital;flag;population;languages`)
    const country = await responce.json();
    return country;       
};

export default {fetchCountry}