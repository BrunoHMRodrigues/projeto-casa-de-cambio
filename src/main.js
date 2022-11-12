import './style.css'
import "bootstrap-icons/font/bootstrap-icons.css";

const currency = document.getElementById('input-currency')
const btnSearch = document.getElementById('btn-search');
const ul = document.getElementById('ul-currency');
const header = document.getElementById('header-result');
let allLi;
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
        currencies.forEach((element) => {
            const li = document.createElement('li');
            li.classList.add('list-currency');
            li.innerHTML = `<div class="container-coin"><i class="bi bi-coin"></i><p class="coin">${element[0]}</p></div><p class="conversion">${element[1]}</p>`;
            ul.appendChild(li);
        });
        allLi = document.querySelectorAll('.list-currency');
        header.innerText = `Valores referentes a 1 ${getCur.toUpperCase()}`
        ul.style.overflowY = 'scroll';
    } catch(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          })
    }    
})

ul.addEventListener('click', (event) => {
    const target = event.target;
    const targetClass = target.className;
    if (targetClass === 'list-currency') {
        target.classList.add('selected');
    }
    if (targetClass === 'list-currency selected') {
        target.classList.remove('selected');
    }

    if (event.path[1].className === 'list-currency selected') {
        event.path[1].className = 'list-currency';
    } else if (targetClass === 'conversion') {
        event.path[1].classList.add('selected');
    }    

    if (event.path[2].className === 'list-currency selected') {
        event.path[2].classList.remove('selected');
    } else if (targetClass === 'coin' || targetClass === 'bi bi-coin') {
        event.path[2].classList.add('selected');
    }    

    // console.log(allLi);
})