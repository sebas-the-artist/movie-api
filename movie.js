const filmListEl = document.querySelector('.film-list')
const id = localStorage.getItem("id")

async function onSearchChange(event) {
    const id = event.target.value;
    renderFilm(id)
}

async function renderFilm(id) {
    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    //fetches an api dynamically
    const postsData = await posts.json();
 postListEl.innerHTML = postsData.map(post => postHTML(post)).join('')
}

function postHTML(post) {
return `
    <div class="post">
        <div class="post__title">
            ${post.title}
        </div>
        <p class="post__body">
            ${post.body}
        </p>
    </div>
 `
}

renderPosts(id)