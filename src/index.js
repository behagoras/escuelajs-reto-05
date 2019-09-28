const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let API = 'https://rickandmortyapi.com/api/character/';
API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';

const restartLocalStorage = () => {
  localStorage.removeItem('next_fetch');
}
restartLocalStorage()
// window.addEventListener('beforeunload', () => restartLocalStorage());
const getData = async (api) => {
  if (localStorage.getItem('next_fetch')) {
    api = localStorage.getItem('next_fetch');
  } else {
    // debugger
  }
  const response = await fetch(api);
  const data = await (response.json());
  // window.localStorage['next_fetch'] = data.info.next;
  const characters = data.results;
  let output = characters.map(character => {
    return `
    <article class="Card">
    <img src="${character.image}" />
    <h2>${character.name}<span>${character.species}</span></h2>
    </article>
    `
  }).join('');
  let newItem = document.createElement('section');
  newItem.classList.add('Items');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
  if (data.info.next) {
    localStorage.setItem('next_fetch', data.info.next);
  } else {
    restartLocalStorage()
    intersectionObserver.unobserve($observe);
    const endItem = document.createElement('div');
    endItem.innerHTML = "Ya no hay más elementos para mostrar";
    $app.appendChild(endItem);
  }
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);