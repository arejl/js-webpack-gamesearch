const PageList = (argument = "", givenUrl = "https://api.rawg.io/api/games?dates=2021-04-10,2022-04-10&ordering=-added") => {
  const card = (article) => {
    return `
    <div class="card bg-dark text-white m-3">
      <img class="card__image" src="${article.background_image}" alt="Card image">
      <div class="card__overlay">
        <div class="overlay__text">
          <h5 class="card-title">${article.name}</h5>
          <p class="card-text">${article.released}</p>
          <a href = "#pagedetail/${article.id}" class="btn btn-secondary">See more</a>
        </div>
      </div>
    </div>
  `
  }

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url + `&key=${process.env.RAWG_API_KEY}`;

      if (argument && url.includes("?")) {
        finalURL = url + "&search=" + argument + `&key=${process.env.RAWG_API_KEY}`;
      }
      else if (argument) {
        finalURL = url + "?search=" + argument + `&key=${process.env.RAWG_API_KEY}`;
      }

      fetch(`${finalURL}&page_size=9`)
        .then((response) => response.json())
        .then((response) => {
          if (argument) {document.getElementById("search_title").innerHTML += `Search results for:<h1><strong>${argument.toUpperCase()}</strong></h1>`}
          response.results.forEach((article) => {
            articles += card(article);
          });
          if (response.next) {
            document.querySelector(".page-list").innerHTML += `<button class="btn btn-primary btn-block w-50 mx-auto" id="next_page">Show more</button>`;
            document.getElementById("next_page").addEventListener("click", (event) => { expandList(response.next)
            })
          };
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };
    fetchList(givenUrl, cleanedArgument);
  };

  const expandList = (url) => {
    let button = document.getElementById("next_page");
    button.parentNode.removeChild(button);
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        response.results.forEach((article) => {
          document.querySelector(".page-list .articles").innerHTML += card(article);
        });
        if (document.querySelector(".page-list .articles").childElementCount < 25 && response.next) {
          document.querySelector(".page-list .articles").innerHTML += `<button class="btn btn-primary btn-block w-50 mx-auto" id="next_page">Show more</button>`
          document.getElementById("next_page").addEventListener("click", (event) => { expandList(response.next)
          });
        }
      });
  }

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div id="search_title"class="text-center"></div>
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageList };