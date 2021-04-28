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

const searchGame = (event) => {
  event.preventDefault();
  let search = document.getElementById("searched_game").value;
  PageList(search,"https://api.rawg.io/api/games");
}

document.getElementById("game_search_form").addEventListener("submit", searchGame);
