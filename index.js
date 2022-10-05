const input = document.getElementById("input");
const grid = document.getElementsByClassName("grid");

window.addEventListener("load", darkLightMode);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") loadImg();
});

function loadImg() {
  removeImages();

  const url =
    "https://api.unsplash.com/search/photos/?query=" +
    input.value +
    "&per_page=9&client_id=EdxJLkIvb4kP7cqlJ3de1cNcyRcCEebtFWPRu8NU7GQ";
  fetch(url)
    .then((response) => {
      if (response.ok) return response.json();
      else alert(response.status);
    })

    .then((data) => {
      const imageNodes = [];
      for (let i = 0; i < data.results.length; i++) {
        imageNodes[i] = document.createElement("div");
        imageNodes[i].className = "img";
        imageNodes[i].style.backgroundImage =
          "url(" + data.results[i].urls.raw + ")";
        imageNodes[i].addEventListener("dblclick", function () {
          window.open(data.results[i].links.download, "_blank");
        });
        grid.appendChild(imageNodes[i]);
      }
    });
}

function removeImages() {
  grid.innerHTML = "";
}

function darkLightMode() {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 20 && hour <= 8) {
    document.body.style.backgroundColor = "#d2b2ef";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundColor = "rgb(65 43 86);";
    document.fonts.style.color = "white";
  }
}
