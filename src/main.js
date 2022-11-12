import './style.css'
import "bootstrap-icons/font/bootstrap-icons.css";

const currency = document.getElementById('input-currency')
const btnSearch = document.getElementById('btn-search');
const ul = document.getElementById('ul-currency');

// const apiSearch = `https://api.exchangerate.host/convert?from=${getCur}&to=`

btnSearch.addEventListener('click', async () =>{
    const getCur = currency.value;
    const API = `https://api.exchangerate.host/latest?base=${getCur}`;
    const currencies = await fetch(API)
    .then(response => response.json())
    .then(data => Object.entries(data.rates));

    console.log(currencies);

    currencies.forEach(element => {
        const li = document.createElement('li');
        li.classList.add('list-currency');
        li.innerHTML = `<div class="container-coin"><i class="bi bi-coin"></i><p class="coin">${element[0]}</p></div><p class="conversion">${element[1]}</p>`;
        ul.appendChild(li);
    });
})
