async function fetchMultiplePages(pageCount = 4) {
  const apiKey = 'b03d3741964c2c92fc26dc4f5be0d29e';
  const allMovies = [];

  for (let page = 1; page <= pageCount; page++) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page}`);
    const data = await response.json();
    allMovies.push(...data.results);
  }

  return allMovies;
}

async function main() {
  // Fetch 5 pages (100 movies), adjust pageCount as needed
  const movies = await fetchMultiplePages(5);
  const movieListEl = document.querySelector('.movie__list');

  movieListEl.innerHTML = movies.map(movie => `
    <div class="movie__card" data-release-date="${movie.release_date}" data-rating="${movie.vote_average}">
      <div class="movie__card--container">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="poster" alt="${movie.original_title} poster" />
        <h3>${movie.title}</h3>
        <p><b>Release Date:</b> ${movie.release_date}</p>
        <p><b>Rating:</b> ${movie.vote_average}</p>
      </div>
    </div>
  `).join("");
}

// Filtering function for sorting
function filterMovies(event) {
  const filter = event.target.value;
  const movieList = document.querySelector('.movie__list');
  const movies = Array.from(movieList.querySelectorAll('.movie__card'));

  const moviesData = movies.map(movie => {
    const releaseDate = new Date(movie.dataset.releaseDate).getTime() || 0;
    const rating = parseFloat(movie.dataset.rating) || 0;
    return { movie, releaseDate, rating };
  });

  if (filter === "LOW_TO_HIGH") {
    moviesData.sort((a, b) => a.releaseDate - b.releaseDate);
  } else if (filter === "HIGH_TO_LOW") {
    moviesData.sort((a, b) => b.releaseDate - a.releaseDate);
  } else if (filter === "RATING") {
    moviesData.sort((a, b) => b.rating - a.rating);
  }

  movieList.innerHTML = "";
  moviesData.forEach(({ movie }) => movieList.appendChild(movie));
}

// Attach event listener to filter select
document.getElementById('filter').addEventListener('change', filterMovies);

// Search functionality
const searchInput = document.querySelector('.landing__search--bar');

function searchMovies() {
  const searchValue = searchInput.value.toLowerCase();
  const movies = document.querySelectorAll('.movie__card');

  movies.forEach(movie => {
    const title = movie.querySelector('h3').textContent.toLowerCase();
    if (title.includes(searchValue)) {
      movie.style.display = '';
    } else {
      movie.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', searchMovies);

// Initialize rendering
main();







/*


//   "https://api.themoviedb.org/3/movie/top_rated?api_key=b03d3741964c2c92fc26dc4f5be0d29e"
//   "https://api.themoviedb.org/3/search/movie?api_key=b03d3741964c2c92fc26dc4f5be0d29e&query=Guardians"

async function main() {
    //const movies = await fetch("https://api.themoviedb.org/3/search/movie?api_key=b03d3741964c2c92fc26dc4f5be0d29e&query=dragon ball")
    //const movies = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=b03d3741964c2c92fc26dc4f5be0d29e")
    const movies = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=b03d3741964c2c92fc26dc4f5be0d29e&page=22")
    const moviesData = await movies.json();
    const movieListEl = document.querySelector('.movie__list')
console.log(moviesData)
    movieListEl.innerHTML = moviesData
        .results.map(
          (movie) => `<div class="movie__card">
            <div class="movie__card--container">
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="poster" alt="${movie.original_title} poster" />
                <h3>${movie.title}</h4>
                <p><b>Release Date: </b>${movie.release_date}</p>
                <p><b>rating: </b>${movie.vote_average} </p>
            </div>
            </div>`
        )
        .join("")
}

main()

*/













/*

const filmListEl = document.querySelector('.film-list')
const id = localStorage.getItem("id")

async function onSearchChange(event) {
    const id = event.target.value;
    renderFilm(id)
}

async function renderFilms(id) {
    const films = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=ca90ab3b=${id}`)
    //fetches an api dynamically
    const filmsData = await films.json();
 filmListEl.innerHTML = filmsData.map(film => postHTML(film)).join('')
}

function postHTML(film) {
return `
    <div class="film">
        <div class="film__title">
            ${film.title}
        </div>
        <p class="film__poster">
            ${film.body}
        </p>
    </div>
 `
}

renderFilms(id)

*/