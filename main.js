const API_KEY = `c80114dd430c49e695b9e043cf00f498`;
let newsList = [];
let searchBtn = document.getElementById("search-button");
let searchOn = false;
const menus = document.querySelectorAll(".menus button");
const sideMenus = document.querySelectorAll(".side-menu-list button");
let input = document.getElementById("input-news");

searchBtn.addEventListener("click", inputSwitch);

[...menus, ...sideMenus].forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("go-button").click();
  }
});

let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
);

const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No matches for your search.");
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestName = async () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  getNews();
};
getLatestName();

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = input.value;
  console.log("keyword", keyword);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  );
  getNews();
  input.value = "";
};

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function render() {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
    <div class="col-lg-4">
      <img
        class="news-img-size"
        src="${
          news.urlToImage ||
          "https://thumbs.dreamstime.com/b/image-not-available-icon-vector-set-white-background-eps-338269360.jpg"
        }" onerror="this.src='https://thumbs.dreamstime.com/b/image-not-available-icon-vector-set-white-background-eps-338269360.jpg'"
      />
    </div>
    <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>${
        news.description == null || news.description == ""
          ? "내용없음"
          : news.description.length > 200
          ? news.description.slice(0, 200) + "..."
          : news.description
      }</p>
      <div>${news.source.name || "no source"} * ${moment(news.publishedAt)
        .startOf("hour")
        .fromNow()}</div>
    </div>
  </div>`
    )
    .join("");
  console.log("html: ", newsHTML);
  document.getElementById("news-board").innerHTML = newsHTML;
}

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage} 
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

function inputSwitch() {
  if (searchOn === false) {
    document.getElementById("input-news").style.visibility = "visible";
    document.getElementById("go-button").style.visibility = "visible";
    searchOn = true;
  } else if (searchOn === true) {
    document.getElementById("input-news").style.visibility = "hidden";
    document.getElementById("go-button").style.visibility = "hidden";
    searchOn = false;
  }
}
