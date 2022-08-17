const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");
const search = document.querySelector(".search-container");
const apiURL12 = "https://randomuser.me/api/?nat=us&results=12";
// const apiURL12 = "https://randomuser.me/api/?nat=us&results=" + numOfResults;
// const apiURL24 = "https://randomuser.me/api/?nat=us&results=24";
// const apiURL36 = "https://randomuser.me/api/?nat=us&results=36";
// const apiURL48 = "https://randomuser.me/api/?nat=us&results=48";
let employeeData = "";
let employeeNumber = "";

//Calling API to display results from randomuser.me and add them to the page
function fetchData(url) {
  return fetch(url).then((res) => res.json());
}

fetchData(apiURL12)
  .then((data) => data.results)
  .then(employeeAppend)
  .then(searchBar)
  .catch((err) => alert(err));

function employeeAppend(attributes) {
  employeeData = attributes;
  const values = employeeData
    .map(
      (attribute) => `<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${attribute.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${attribute.name.first} ${attribute.name.last}</h3>
        <p class="card-text">${attribute.email}</p>
        <p class="card-text cap">${attribute.location.city}, ${attribute.location.state}</p>
    </div>
    </div>`
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", values);
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) =>
    card.addEventListener("click", (e) => {
      modalDisplay(index);
      employeeNumber = index;
    })
  );
}
//generates the HTML of the modal and inserts at the end of body tag
function modalDisplay(position) {
  const values = employeeData
    .map(
      (attribute) =>
        `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${
                      attribute.picture.large
                    }" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${
                      attribute.name.first
                    } ${attribute.name.last}</h3>
                    <p class="modal-text">${attribute.email}</p>
                    <p class="modal-text cap">${attribute.location.city}</p>
                    <hr>
                    <p class="modal-text">${attribute.cell.replace(
                      "-",
                      " "
                    )}</p>
                    <p class="modal-text">${attribute.location.street.number} ${
          attribute.location.street.name
        }, ${attribute.location.city}, ${attribute.location.state}</p>
                    <p class="modal-text">Birthday: ${dateFormat(
                      attribute.dob.date
                    )}</p>
                </div>
            </div>
            <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`
    )
    .filter((list, index) => position === index);
  body.insertAdjacentHTML("beforeend", values);
  employeeNumber = position;
  closeButton();
}
//remove Modal when close button is clicked
function closeButton() {
  const closeBtn = document.querySelector("#modal-close-btn");
  const modal = document.querySelector(".modal-container");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      body.removeChild(modal);
    });
  }
}

function dateFormat(number) {
  let newdate = number.split("T")[0].replace(/-/g, "/").split("/");
  const convertdate = `${newdate[1]}\/${newdate[2]}\/${newdate[0]} `;
  return convertdate;
}
//Function to use the searchbar to narrow results on the page based on search input
function searchBar() {
  if (search) {
    const searchHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
    search.insertAdjacentHTML("beforeend", searchHTML);

    const searchInput = document.querySelector("#search-input");
    const renderedCards = document.querySelectorAll(".card");

    searchInput.addEventListener("keyup", () => {
      for (let i = 0; i < renderedCards.length; i++) {
        if (
          searchInput.value !== null &&
          !renderedCards[i].children[1].children[0].textContent
            .toLowerCase()
            .includes(searchInput.value.toLowerCase())
        ) {
          renderedCards[i].style.display = "none";
        } else if (searchInput.value === null) {
          renderedCards[i].style.display = "";
        } else if (
          searchInput.value !== null &&
          renderedCards[i].children[1].children[0].textContent
            .toLowerCase()
            .includes(searchInput.value.toLowerCase())
        ) {
          renderedCards[i].style.display = "";
        }
      }
    });
  }
}

//Event Listeners for Next & Prev Buttons
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "modal-next") {
    document.querySelector(".modal-container").remove();
    if (employeeNumber <= 10) {
      modalDisplay(employeeNumber + 1);
    } else {
      modalDisplay(0);
    }
  } else if (e.target && e.target.id === "modal-prev") {
    document.querySelector(".modal-container").remove();
    if (employeeNumber === 0) {
      modalDisplay(11);
    } else {
      modalDisplay(employeeNumber - 1);
    }
  }
});
