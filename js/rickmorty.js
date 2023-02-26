const personajes = document.getElementById('personajes');
const buttons = document.getElementById('buttons');
const goUp = document.getElementById('goUp');
const endpoint = 'https://rickandmortyapi.com/graphql';

async function fetchCharacters(page) {
  const query = `
    query Query {
      characters(page: ${page}) {
        results {
          image
          name
          species
          status
        }
      }
    }
  `;

  const response = await axios.post(endpoint, { query });
  return response.data.data.characters.results;
}

async function displayCharacters(page) {
  const characters = await fetchCharacters(page);

  personajes.innerHTML = '';
  for (const character of characters) {
    personajes.innerHTML += `
      <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${character.image}" alt="Card image cap">
      <div class="card-body text-center">
        <h5 class="card-title">${character.name}</h5>
        <p class="card-text">${character.species}</p>
        <p class="card-text">${character.status}</p>
      </div>
    </div>
      `;
  }

  buttons.innerHTML = `
    <button id="prevButton" class="btn btn-secondary">Anterior</button>
    <button id="nextButton" class="btn btn-secondary">Siguiente</button>
  `;

  goUp.innerHTML = `
    <button id="goUpButton" class="btn btn-primary">Subir</button>
  `;

  let prevButton = document.getElementById("prevButton");
  prevButton.addEventListener('click', () => {
    if (page > 1) {
      displayCharacters(page - 1);
    }
  });

  let nextButton = document.getElementById("nextButton");
  nextButton.addEventListener('click', () => {
    displayCharacters(page + 1);
  });

  let goUpButton = document.getElementById("goUpButton");
  
  goUpButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

}

displayCharacters(1);
