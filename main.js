const API_KEY = `c80114dd430c49e695b9e043cf00f498`;
let news = [];
const getLatestName = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log(response);
  news = data.articles;
  console.log("data:", news);
};
getLatestName();
