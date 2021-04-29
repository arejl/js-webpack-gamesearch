import '../style/style.scss';
import 'bootstrap';
var Masonry = require('masonry-layout');

import { routes } from './routes';
import { PageList } from './PageList';

let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

const returnHome = () => {
  PageList();
}

document.querySelector("a.navbar-brand").addEventListener("click", returnHome);
document.querySelector("a.nav-link").addEventListener("click", returnHome);

const searchGame = (event) => {
  event.preventDefault();
  let search = document.getElementById("searched_game").value;
  history.pushState({}, '', 'index.html#');
  PageList(search,"https://api.rawg.io/api/games");
}

document.getElementById("game_search_form").addEventListener("submit", searchGame);

const storeIcon = (name) => {
  if (name.toLowerCase().includes("xbox")) { return 'src/assets/images/xbox.svg' }
  else if (name.toLowerCase().includes("playstation")) { return 'src/assets/images/ps4.svg' }
  else if (name.toLowerCase().includes("switch") || name.toLowerCase().includes("nintendo")) { return 'src/assets/images/switch.svg' }
  else { return 'src/assets/images/windows.svg' }
}

export { storeIcon }
