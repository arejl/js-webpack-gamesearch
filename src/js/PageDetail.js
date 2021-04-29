import { PageList } from './PageList';
import { storeIcon } from './index';

const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    const fetchGame = (url, argument) => {
      let finalURL = url + argument + `?key=${process.env.RAWG_API_KEY}`;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { name, released, description, website, publishers, background_image, developers, platforms, genres, tags, rating, ratings_count, stores } = response;

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("img.main-img").src = background_image;
          if (website && website != "") { articleDOM.querySelector("span.website").innerHTML = `<a class="btn btn-danger" href="${website}">Check website</a>` };
          articleDOM.querySelector("h1.title").innerHTML = `<strong>${name}</strong>`;
          articleDOM.querySelector("h3.ratings").innerHTML = `<strong>${rating}/5 - ${ratings_count} ratings</strong>`;
          articleDOM.querySelector("span.release-date").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;
          articleDOM.querySelector("span.publishers").innerHTML += `${publishers.map(element => `<a class="innerlink" href="#">${element.name}</a>`).join("</br>")}`
          articleDOM.querySelector("span.developers").innerHTML += `${developers.map(element => `<a class="innerlink" href="#">${element.name}</a>`).join("</br>")}`
          articleDOM.querySelector("span.platforms").innerHTML += `${platforms.map(element => `<a class="innerlink" href="#" id="${element.platform.id}">${element.platform.name}</a>`).join("</br>")}`
          articleDOM.querySelector("span.genres").innerHTML += `${genres.map(element => `<a class="innerlink" href="#">${element.name}</a>`).join(", ")}`
          articleDOM.querySelector("span.tags").innerHTML += `${tags.map(element => `<a class="innerlink" href="#">${element.name}</a>`).join(", ")}`
          articleDOM.querySelector("span.buy").innerHTML += `${stores.map(element => `<a class="innerlink" href="">${element.store.name}</a> <img src="${storeIcon(element.store.name)}">`).join("</br>")}`
          articleDOM.querySelectorAll("span.genres a").forEach(element => { element.addEventListener("click", event => { event.preventDefault();history.pushState({}, '', 'index.html#');PageList("", `https://api.rawg.io/api/games?genres=${element.innerHTML.toLowerCase().replace(/\s+/g, "-")}`) })});
          articleDOM.querySelectorAll("span.tags a").forEach(element => { element.addEventListener("click", event => { event.preventDefault(); history.pushState({}, '', 'index.html#');PageList("", `https://api.rawg.io/api/games?tags=${element.innerHTML.toLowerCase().replace(/\s+/g, "-")}`) }) });
          articleDOM.querySelectorAll("span.publishers a").forEach(element => { element.addEventListener("click", event => { event.preventDefault(); history.pushState({}, '', 'index.html#');PageList("", `https://api.rawg.io/api/games?publishers=${element.innerHTML.toLowerCase().replace(/\s+/g, "-")}`) }) });
          articleDOM.querySelectorAll("span.developers a").forEach(element => { element.addEventListener("click", event => { event.preventDefault(); history.pushState({}, '', 'index.html#');PageList("", `https://api.rawg.io/api/games?developers=${element.innerHTML.toLowerCase().replace(/\s+/g, "-")}`) }) });
          articleDOM.querySelectorAll("span.platforms a").forEach(element => { element.addEventListener("click", event => { event.preventDefault();history.pushState({}, '', 'index.html#');PageList("", `https://api.rawg.io/api/games?platforms=${element.id}`) })});
        });
    };
    
    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);

    const fetchScreenshots = (url, argument) => {
      let finalURL = url + argument + `/screenshots?key=${process.env.RAWG_API_KEY}`;
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { results } = response;
          let articleDOM = document.querySelector(".page-detail .article");
          if (results.length < 4) { articleDOM.querySelector("div.screenshots").innerHTML += `${results.map(element => `<img src="${(element.image)}" class="game-screenshot">`).join("")}` }
          else { let i; for (i = 0; i < 4; i++) { articleDOM.querySelector("div.screenshots").innerHTML += `<img src="${(results[i].image)}" class="game-screenshot">` } };
        });
    };

    fetchScreenshots("https://api.rawg.io/api/games/", cleanedArgument);

    const fetchStores = (url, argument) => {
      let finalURL = url + argument + `/stores?key=${process.env.RAWG_API_KEY}`;
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { results } = response;
          let articleDOM = document.querySelector(".page-detail .article");
          let i = 0;
          articleDOM.querySelectorAll("span.buy a").forEach(link => { link.href = results[i].url; i++})
        });
    };

    fetchStores("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <div class="top-img">
            <img class="main-img">
            <span class="website"></span>
          </div>
          <div class="row py-3">
            <div class="col-lg-8">
              <h1 class="title"></h1>
            </div>
            <div class="col-lg-4 text-right">
            <h3 class="ratings text-danger"></h3>
            </div>
          </div>
          <div class="row py-3">
            <div class="col">           
              <p class="description"></p>
            </div>
          </div>
          <div class="row py-3">
            <div class="col"><strong>Release date</strong><br/> <span class="release-date"></span></div>
            <div class="col"><strong>Developers</strong><br/> <span class="developers"></span></div>
            <div class="col"><strong>Platforms</strong><br/> <span class="platforms"></span></div>
            <div class="col"><strong>Publishers</strong><br/> <span class="publishers"></span></div>
          </div>
          <div class="row py-3">
          <div class="col"><strong>Genres</strong><br/> <span class="genres"></span></div>
          <div class="col"><strong>Tags</strong><br/> <span class="tags"></span></div>
          </div>
          <div class="row py-3">
            <div class="col"><h2>Buy</h2></div>
          </div>
          <div class="row py-3">
            <div class="col"><span class="buy"></span></div>
          </div>
          <div class="row py-3">
            <div class="col"><h2>Screenshots</h2></div>
          </div>
          <div class="row py-3">
            <div class="screenshots col text-center"></div>
          </div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };