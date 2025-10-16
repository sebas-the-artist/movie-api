//const apiKey = 'b03d3741964c2c92fc26dc4f5be0d29e';
const apiKey = '21110f1925ffb41fd57f1adacaba614b';
const movieListEl = document.querySelector('.movie__list');
const errorMessageEl = document.createElement('div');
errorMessageEl.style.color = '#3146e6';
errorMessageEl.style.fontSize = '48px';
errorMessageEl.style.margin = '48px 0';
errorMessageEl.style.textAlign = 'center';
errorMessageEl.style.fontWeight = 'bold';
movieListEl.parentNode.insertBefore(errorMessageEl, movieListEl);

async function fetchMultiplePages(category = "top_rated", pageCount = 22) {
  const allMovies = [];

  for (let page = 2; page <= pageCount; page++) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`);
    const data = await response.json();
    allMovies.push(...data.results);
  }

  return allMovies;
}

async function searchMovies(query) {
  if (!query) {
    errorMessageEl.style.display = 'none';
    return fetchAndDisplayCategory(); // fallback to category list
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      errorMessageEl.textContent = `No movies found for "${query}"`;
      errorMessageEl.style.display = 'block';
      movieListEl.innerHTML = '';
      return;
    }

    errorMessageEl.style.display = 'none';
    displayMovies(data.results);
  } catch (error) {
    errorMessageEl.textContent = "Sorry, something went wrong while searching.";
    errorMessageEl.style.display = 'block';
    movieListEl.innerHTML = '';
    console.error(error);
  }
}




function displayMovies(movies) {
  // List titles or IDs of movies you want to exclude
  const bannedTitles = ['shy g cup sakura momo',
     'japanese idol with beautiful big tits - mihara momoka',
     'groper train hurry up and come', 'the girl next door','the girl next door 2',
     'the girl next door 3','lusty ama: stirred-up pot','bondage white coat torture',
     'sexual harassment baptism: eating disorder','sexual harassment female boss: pantyhose sexual torture',
     'married woman breeding diary: first night of affair','I got milfed','breast orgy',
     'sticky wife, begging wife','sticky wife, begging wife ii: while being watched by her husband',
     'sticky wife, begging wife iii: adulterous wife straddling','kate asabuki: the woman in the peep room',
     'molester hot spring lewd bath trip','lewd fetish: peverted big ass',
     'female student lewd dance',"college girls' secret job",'busty girlfriend',
     'sex girl', 'sex girl 2','sex girl 3','sex girl 4','sex girl 5','sex girl 6',
     'sex girl 7','sex girl 8','sex girl 9','sex girl 10','sex girl 11','sex girl 12',
     'sex girl 13','sex girl 14','sex girl 15','sex girl 17','fingering indecent theater (secret) molestation ...',
     'college girls: sex equation',"room girl's sex skills",'toy girl: sex app addiction',
    'magical slut: ripe meat invitation','wild slut: beautiful legs pheromone',
    'lustful slut: instructions behind closed doors','slutty, busty & bad','big tits mom friend',
    'big tits sisters','big tit monastery','the real big tits!',
    'agonizing screening: the silver screens big tits beauties','big tits friend sisters',
    'big breasted woman','blood type a, a big breasted girlfriend','eve is getting wet',
    'wet dream: prostitute woman','sex hunter: wet target','playboy wet & wild: slippery when wet',
    'room salon college girls','room salon college girls 2','room salon college girls 3',
    "female college student's massage",'paradise inn phuket: the taste of college students',
    'dangerous relationship: professor and female college student','obscene female college students',
    "college girls' massage parlor",'drunk college girls', "secret love: my friend's mom",
    "my student's mom",'bosomy mom','busty cops','busty cops: protect and serve!','busty cops 2',
    'busty cops and the jewel of denial','afternoon busty este','busty coeds vs. lusty cheerleaders',
    'the busty lesbian','love hunter: lust','busty housewives of beverly hills','alabama jones and the busty crusade',
    'lewd busty wife','new natural floral juice sayaka: virgins vs. busty delinquents',
    "sex and lovedoll: lily, the beautiful busty bride secret's body",'nikuka coast: a shop with beautiful busty staff',
    'the lusty busty babe-a-que','busty exxxercise','bad and busty',
    'lesbian in mourning clothes, shameful mother and widow','lesbian world: fondling',
    'lesbian queen zoku kaoru kiri','leggings mania','temptation prostitute of sora and shidod',
    'advanced prostitute','advanced prostitute 2','chinese four given names people prostitute: li xiangjun',
    'chinese four given names people prostitute: chen yuanyuan','whore hospital 4: no-pants nursing',
    'whore angels','female boss hooker',"hooker's world",'lusty tales of married women',"a lusty wife's double life",
    'lusty discipline in uniform','lusty hot spring',"woman's bedroom: lusty competition",
    'lusty liaisons','lusty liaisons ii','lust',"groper train: pervert's dreams and reality",
    'space-time pervert: if time could stop!','big breasted mother',"kaikan heroine: breasts shakedown",
    'big breasts sister 2','big breasts sister','the girl with the breast milk vaccine',
    "24 year old yoon yul's sexy breasts",'big breasts sucking','big breasted daughter-in-law',
    "rope and breasts",'lee eun-mi big breasts',"big breasts vs big cock ~ perverted tower love",
    'stepmom and big breasted sister','big-breasted sister-in-law','big-breasted caregiver - special service',
    'the big breasts sisters','the big breasts sisters 2','big breasted secretary reverse rape',
    'their competitive sex with big breasts','mature mother & daughter orgy',
    'i would like to be enraptured, muzzled, and on my back tattooed','big tits doll: obscene breeding',
    'the orgasm counselor','orgasm boarding house','new spring orgasms','youngest aunt',
    'young aunt','young aunt 2','young aunt 3','youngest daughter-in-law','youngest Sister-in-law',
    'youngest Sister-in-law s','the youngest sister-in-law','the youngest sister-in-law 2',
    'young sister-in-law','young sister-in-law 2','young sister-in-law 3',"brother-in-law's youngest daughter",
    'hole-in-law',"newaza gal: straight from behind",'i love it from behind!','pussy rubbing married women',
    'married woman fan club',"a married woman's ejaculation log",'a married woman eating',
    'married woman travel moist disturbed shellfish',"married woman travel moist disturbed shellfish",
    "beloved married woman",'married man vs. married woman','open marriage: aru fuufu no katachi',
    'the taste of married women','tiny titties collection','big natural titties collection',
    "big titty office milfs collection",'super space-time pervert 2: sexy time again',
    'abnormal experience: tinkering with perverted juices',"toyomaru's pervert clinic",
    "pervert observation shame hole bare",'space-time pervert: time stop!',"two sisters' sexy pervert",
    "new space-time pervert: time stop ecstasy","perverted examination: nurse huge breasts torture",
    "lesbian schoolgirls and the pleasure of perverting",'perverted examination: nurse huge breasts torture',
    'abnormal experience: tinkering with perverted juices','space-time perverted virgin',
    'space-time perverted virgin 2',"perverted family: big brother's tutor",'perverted wife: obscene comparison',
    'perverted sisters: husband exchange','perverted family','perverted art : sucking bond',
    'perverted young wife','young wife perverted preparation','prison breeding - torture & rape female prisoner: arisa',
    'subway serial rape: uniform hunting','rape frenzy: five minutes before graduation',
    'schoolmistress 3',"schoolgirl diary: maiden's prayer",'naked fist omega','groper train: naughty lower body',
    'd cup girlfriend','girls delinquency','sexy oral: uwakina kuchibiru','erotic tutoring 2',
    'younger sister monica',"100 high school girls: secret motel report",'apartment wife: secret call girl',
    'call girl: lust cage','schoolmistress','schoolmistress 2','schoolmistress 3','schoolmistress 4',
    'shinjin kyonyû: hasande san-patsu!','raw married woman sensitive pot',"kind daughter's inside story",
    "wife's pretty daughter","wife for rent",'apartment wife orgy: swap club',"swapping: senior's wife",
    "sisters' tasty swapping","sister-in-law's taste","sister-in-law's taste 2","18 year old hara's tasty class",
    'blue season: 17-year-old venus.','sensitive mother and daughter',"master's mother and daughter",
    "denwa bôkô-ma: okasareta 17-nin no wakamono",'boob housekeeper','big boobs sisters: the yellow panties of happiness',
    'beautiful sisters: stripped!','hot spring resort: geishas vs. ozashiki strippers','strippers exposed',
    'onsen geisha since birth','ghostly hot spring trip: beautiful three women', "mother-in-law's long undergarment, lewd smell",
    'sex document: kigu hanbai-jin','next door aunt ass close-up sex','artificial intelligence sex',
    'tasty brother','tasty aunt',"young sister's taste","the taste of a hot sister-in-law",
    'beautiful sisters: seduced','a certain seductive summer','female urologists 3','voyeur target 1 beautiful secretary who took off her uniform',
    'purpose of reunion 3','stockings: her conspiracy','stocking assault demon throw it in!',
    'creamy tits secretary: hiding the stockings','stockings','stocking club','street stall',
    'stalking bôkôma',"stepmom's desire",'ai-eki-mamire no hanayome','erotic story of esper mamiko',
    'eizu o buttobase: momoiro puttsun musume','sexual harassment police',"a stepfather's courtship: a tongue crawling over soft skin",
    'office Lady soft skin maniac','adultery alumni association','adultery alumni association 2',
    'adultery alumni association 3','adult only institute','adult only institute 2',
    'molestation and peeping: exposed lower body',"my stepmom's a squirter collection",
    'raw underwear in a white coat, thigh licking','senior couple and exchange sex','couple exchange',
    'dangerous younger cousin','skin. like. sun.','tinto brass presents erotic short stories: part 3',
    'pawg pleasures collection','borders of love','bosomy tae-hee','little daughters','youthful older sister',
    "lee chaedam's g-spot",'spong','spong part 2','sponsor',"the couple's sponsor",
    'married woman travel moist disturbed shellfish','molester train: agony! secret dream teasing',
    'purpose of cohabitation','pornocracy: the new sex multinationals', 'the porno killers', 'oh! takarazuka'
    

    ];
  const bannedIds = [876897]; // TMDb movie IDs to exclude

  // Filter out banned movies
  const filteredMovies = movies.filter(movie => {
    const title = (movie.title || '').toLowerCase();
    const id = movie.id;
    return !bannedTitles.includes(title) && !bannedIds.includes(id);
});

movieListEl.innerHTML = filteredMovies.map(movie => {
    const imgSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'assets/dvd_case.jpg';
    const posterClass = movie.adult ? "poster adult-movie" : "poster";
    
    
    return `
    <div class="movie__card" data-release-date="${movie.release_date}" data-rating="${movie.vote_average}">
    <div class="movie__card--container">
    <img src="${imgSrc}" class="${posterClass}" alt="${movie.title || movie.original_title} poster" />
    <div class="movie-card-info">
    <h3 class="movie__title">${movie.title || movie.original_title}</h3>
    <p><b>Rating:</b> <span class="movie-rating-stars">${getStarIcons(movie.vote_average)}</span></p>
    <p><b>Release Date:</b> ${movie.release_date}</p>
    </div>
    <div class="overview-overlay">
    <p>${movie.overview || "No description available."}</p>
    </div>
    </div>
    </div>
    `;
    
}).join("");

movieListEl.style.display = 'flex';
document.querySelectorAll('.movie__title').forEach(el => {
if (el.textContent.length > 50) {
  el.style.fontSize = '13px';
}
else if (el.textContent.length > 40) {
  el.style.fontSize = '15px';
}
 else {
  el.style.fontSize = '18px';
}
});
}







// before i filtered out the adult content
/*

function displayMovies(movies) {
  movieListEl.innerHTML = movies.map(movie => {
    // If poster_path is missing, use your local dvd_case image
    const imgSrc = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : 'assets/dvd_case.jpg';

    return `
      <div class="movie__card" data-release-date="${movie.release_date}" data-rating="${movie.vote_average}">
        <div class="movie__card--container">
          <img src="${imgSrc}" class="poster" alt="${movie.title || movie.original_title} poster" />
          <div class="movie-card-info">
            <h3>${movie.title || movie.original_title}</h3>
            <p><b>Release Date:</b> ${movie.release_date}</p>
            <p><b>Rating:</b> ${movie.vote_average}</p>
          </div>
          <div class="overview-overlay">
            <p>${movie.overview ? movie.overview : "No description available."}</p>
          </div>
        </div>
      </div>
    `;
  }).join("");
}
*/





//before i put the alternate poster for ones that dont have a poster
/*
function displayMovies(movies) {
  movieListEl.innerHTML = movies.map(movie => `
    <div class="movie__card" data-release-date="${movie.release_date}" data-rating="${movie.vote_average}">
      <div class="movie__card--container">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="poster" alt="${movie.original_title || movie.title} poster" />
        <div class="movie-card-info">
          <h3>${movie.title}</h3>
          <p><b>Release Date:</b> ${movie.release_date}</p>
          <p><b>Rating:</b> ${movie.vote_average}</p>
        </div>
        <div class="overview-overlay">
          <p>${movie.overview ? movie.overview : "No description available."}</p>
        </div>
      </div>
    </div>
  `).join("");
}
  */







async function fetchAndDisplayCategory() {
  const category = "top_rated";
  const movies = await fetchMultiplePages(category, 15);
  displayMovies(movies);
  errorMessageEl.style.display = 'none';
}

// Search input handling
const searchInput = document.querySelector('.landing__search--bar');
searchInput.addEventListener('input', () => {
  searchMovies(searchInput.value.trim());
});

function filterMovies(event) {
  const filter = event.target.value;
  const movies = Array.from(movieListEl.querySelectorAll('.movie__card'));

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

  movieListEl.innerHTML = "";
  moviesData.forEach(({ movie }) => movieListEl.appendChild(movie));
}

document.getElementById('filter').addEventListener('change', filterMovies);

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navClose = document.getElementById('navClose');

navToggle.addEventListener('click', () => navLinks.classList.add('show'));
navClose.addEventListener('click', () => navLinks.classList.remove('show'));

fetchAndDisplayCategory();











function getStarIcons(rating) {
  // Convert 0–10 rating into 0–5 stars:
  const numStars = Math.floor(rating / 2);
  const halfStar = (rating / 2) % 1 >= 0.5;
  let stars = '';

  for(let i=0; i<numStars; i++) {
    stars += '<i class="fa-solid fa-star"></i>';
  }
  if (halfStar) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  const totalStars = halfStar ? numStars + 1 : numStars;
  for(let i=totalStars; i<5; i++) {
    stars += '<i class="fa-regular fa-star"></i>';
  }
  return stars;
}








function showLoading() {
  movieListEl.innerHTML = '<img src="assets/disk.png" style="width: 64px;"  class="loading-icon"/>';
  movieListEl.style.display = 'flex';
  movieListEl.style.justifyContent = 'center';
  movieListEl.style.alignItems = 'center';
  movieListEl.style.paddingBottom = '20%';
  movieListEl.style.minHeight = '300px'; // to keep space consistent
  loadingIcon.style.width = '48px'
}

/*
document.addEventListener('DOMContentLoaded', () => {
  showLoading();  // show spinner immediately

  setTimeout(() => {
    fetchAndDisplayCategory();
  }, 7000);
});
*/
document.addEventListener('DOMContentLoaded', async () => {
  showLoading();

  const loadStart = Date.now();
  const minLoadDuration = 5000; // 5 seconds

  const movies = await fetchMultiplePages("top_rated", 15);

  const loadEnd = Date.now();
  const elapsed = loadEnd - loadStart;

  const remainingDelay = minLoadDuration - elapsed;

  if (remainingDelay > 0) {
    setTimeout(() => {
      displayMovies(movies);
      errorMessageEl.style.display = 'none';
    }, remainingDelay);
  } else {
    displayMovies(movies);
    errorMessageEl.style.display = 'none';
  }
});




window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('movieSearchInput');
  const savedSearch = localStorage.getItem('searchQuery');

  if (savedSearch) {
    input.value = savedSearch;
    input.focus();

    setTimeout(() => {
      searchMovies(savedSearch); 
    }, 100);

    localStorage.removeItem('searchQuery'); // Optional cleanup
  }
});
/* window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('movieSearchInput');
  const savedSearch = localStorage.getItem('searchQuery');

  if (savedSearch) {
    input.value = savedSearch;

    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);

    localStorage.removeItem('searchQuery'); // Optional: clear after loading
  }
}); */
/* window.addEventListener('DOMContentLoaded', () => {
    const savedSearch = localStorage.getItem('searchQuery');
    if (savedSearch) {
      document.getElementById('movieSearchInput').value = savedSearch;
      localStorage.removeItem('searchQuery'); // Optional: clear after loading
    }
  }); */


  let debounceTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  const query = searchInput.value.trim();

  if(query === '') {
    movieListEl.innerHTML = '';
    errorMessageEl.style.display = 'none';
    return;
  }

  debounceTimer = setTimeout(() => {
    searchMovies(query);
  }, 8000);
});






//this is the one i had before i "ai'd" the search portion to pull movies that arent even pulled from the api. before it was only the like 100 i pulled
/*
async function fetchMultiplePages(category = "top_rated", pageCount = 22) {
  const apiKey = 'b03d3741964c2c92fc26dc4f5be0d29e';
  const allMovies = [];

  for (let page = 2; page <= pageCount; page++) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`);
    const data = await response.json();
    allMovies.push(...data.results);
    console.log(data)
  }

  return allMovies;
}

async function main() {
  // Change category here: "top_rated", "popular", "now_playing", "upcoming", "discover"
  const category = "top_rated";
  
  // Fetch multiple pages (adjust pageCount as needed)
  const movies = await fetchMultiplePages(category, 15);
  const movieListEl = document.querySelector('.movie__list');


movieListEl.innerHTML = movies.map(movie => `
  <div class="movie__card" data-release-date="${movie.release_date}" data-rating="${movie.vote_average}">
    <div class="movie__card--container">
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="poster" alt="${movie.original_title} poster" />
      <div class="movie-card-info">
        <h3>${movie.title}</h3>
        <p><b>Release Date:</b> ${movie.release_date}</p>
        <p><b>Rating:</b> ${movie.vote_average}</p>
      </div>
      <div class="overview-overlay">
        <p>${movie.overview ? movie.overview : "No description available."}</p>
      </div>
    </div>
  </div>
`).join("");


}

// Filtering, searching, and event listeners remain the same,,,,,"{
// "

// Initialize rendering
main();

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



const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navClose = document.getElementById('navClose');

navToggle.addEventListener('click', () => {
  navLinks.classList.add('show');
});

navClose.addEventListener('click', () => {
  navLinks.classList.remove('show');
});
*/






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