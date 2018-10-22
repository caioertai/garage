// The URL of our garage
const url = "https://wagon-garage-api.herokuapp.com/mexico/cars";

// The function that generates our car html tag
function carDisplay(car) {
  return `
    <div class="car">
      <div class="car-image">
        <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
      </div>
      <div class="car-info">
        <h4>${car.brand} ${car.model}</h4>
        <p><strong>Owner:</strong> ${car.owner}</p>
        <p><strong>Plate:</strong> ${car.plate}</p>
      </div>
    </div>`
}

// This inserts a car tag on the .card-list
function insertCar(car) {
  document.querySelector('.cars-list').insertAdjacentHTML('afterbegin',carDisplay(car))
}

// Does the POST request for addind a car to the API
const addCar = (event) => {
  event.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(getCarInput(event))
  }).then(response => response.json())
    .then((car) => {
      insertCar(car)
    });
}

// Generates a car object from the form inputs
function getCarInput (event) {
  return {
    brand: document.querySelector('#brand').value,
    model: document.querySelector('#model').value,
    owner: document.querySelector('#owner').value,
    plate: document.querySelector('#plate').value
  }
}

// Fetches the information from all the cars in the api
fetch(url)
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    // Calls insertCar for each car found in the car index
    data.forEach(car => {
     insertCar(car)
    })
});

document.querySelector('form').addEventListener('submit', addCar);
