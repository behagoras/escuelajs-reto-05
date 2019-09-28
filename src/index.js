const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let API = 'https://rickandmortyapi.com/api/character/';
API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';

const getData = async (api) => {
  if (window.localStorage['next_fetch']) {
    api = window.localStorage['next_fetch'];
  }
  const response = await fetch(api);
  const data = await (response.json());
  window.localStorage['next_fetch'] = data.info.next;
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