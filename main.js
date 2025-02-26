const API_KEY = `c80114dd430c49e695b9e043cf00f498`;
let newsList = [];
let searchBtn = document.getElementById("search-button");
let searchOn = false;

searchBtn.addEventListener("click", inputSwitch);

const getLatestName = async () => {
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log(response);
  newsList = data.articles;
  console.log("data:", newsList);
  render();
};
getLatestName();

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
