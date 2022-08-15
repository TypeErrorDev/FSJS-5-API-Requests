/* ==================================
            GLOBAL VARIABLES
===================================== */
const CARD = document.getElementsByClassName(".card");

/* ==================================
        FETCHING/POPULATING DATA
===================================== */
fetch("https://randomuser.me/api/?results=12&nat=us")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const employees = data.results;
    console.log(employees);
    employees.forEach((employee) => {
      console.log(employee);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            `;
      document.querySelector("#gallery").appendChild(card);
    });
  });

/* ==================================
            EVENT LISTENERS
===================================== */
document.addEventListener("click", (e) => {
  if (e.target.className === "card") {
    console.log("card clicked");
  }
});

/* ==================================
         SEARCH FILTER FUNCTION
===================================== */
function searchFilter() {
  const input = document.getElementById("search-input");
  const filter = input.value.toUpperCase();
  const cards = document.getElementsByClassName("card");
  const names = document.getElementsByClassName("card-name");
  for (let i = 0; i < cards.length; i++) {
    const name = names[i].textContent;
    if (name.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}
