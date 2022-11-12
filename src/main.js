import './style.css'
import "bootstrap-icons/font/bootstrap-icons.css";

const currency = document.getElementById('input-currency')
const btnSearch = document.getElementById('btn-search');
const ul = document.getElementById('ul-currency');

// const apiSearch = `https://api.exchangerate.host/convert?from=${getCur}&to=`

btnSearch.addEventListener('click', async () =>{
    ul.innerHTML = '';
    try {
        if (currency.value === '') {
            throw new Error('Necessário informar uma moeda.');
        }
        const getCur = currency.value;
        const API = `https://api.exchangerate.host/latest?base=${getCur}`;
    
        const result = await fetch(API)
            .then(response => response.json())
            .then(data => data)
        if (result.base !== getCur.toUpperCase()) {
            throw new Error('Moeda informada não foi encontrada no banco de dados.');
        }
        const currencies = Object.entries(result.rates);
        console.log(currencies);
        currencies.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('list-currency');
            li.innerHTML = `<div class="container-coin"><i class="bi bi-coin"></i><p class="coin">${element[0]}</p></div><p class="conversion">${element[1]}</p>`;
            ul.appendChild(li);
        });
        ul.style.overflowY = 'scroll';
    } catch(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          })
    }    
})
