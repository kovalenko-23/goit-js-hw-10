import './css/style.css';
import './css/country-card-style.css';
import API from './partials/fetchCountries.js';
import countriesList from './templates/countries-list.hbs';
import countryCard from './templates/country-card.hbs';
import { debounce } from 'lodash';
import Notiflix from "notiflix";



const cardInfo = document.querySelector('.country-info');
const cardList = document.querySelector('.country-list');
const searchInput = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

searchInput.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

async function onInputChange(event) {
    event.preventDefault();
    const inputValue = event.target.value;
    cardInfo.innerHTML = '';
    cardList.innerHTML = '';
    
    await API.fetchCountry(inputValue)
    .then((countries => {
        if (countries.length === 1) {
            renderCountryInfo(countries);
            const languages = countries[0].languages.map(l => l.name).join(', ');
            const markup = `<p><p class="params__item">Languages:</p> ${languages}</p>`;
            cardInfo.insertAdjacentHTML('beforeend', markup);
        }

        if (countries.length >= 2 && countries.length <= 10) {
            renderCountryList(countries);
        }

        if (countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
        }

        if (!countries.length) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
        }
    }))
        .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
}


function renderCountryInfo(country) {
    const markup = countryCard(country);
    cardInfo.innerHTML = markup;
};

function renderCountryList(country) {
    if (country.length >2) {
        const markup = countriesList(country);
        cardList.innerHTML = markup;
    }
}
