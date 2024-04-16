console.log("Connected")
// GET ALL THE CARS AND DISPLAY
const list = document.querySelector('.cars-list')
const form = document.querySelector('.car-form')


const url = "https://wagon-garage-api.herokuapp.com/awesome-garage-1620/cars"

const fetchAllCars = () => {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      // display each one of the cars into the view

      list.innerHTML = ''
      data.forEach((element) => {

        list.innerHTML += `<div class="car">
            <div class="car-image">
              <img src="http://loremflickr.com/280/280/${element.brand} ${element.model}" />
            </div>
            <div class="car-info">
              <h4>${element.brand} ${element.model}</h4>
              <p><strong>Owner:</strong> ${element.owner}</p>
              <p><strong>Plate:</strong> ${element.plate}</p>
            </div>
          </div>`
      })
    })
}

// 0. SELECT YOUR ELEMENTS!!!!!

// console.log(form);
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const carDetails = new FormData(event.currentTarget)
  const newCar = Object.fromEntries(carDetails)

  const sendDetails = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCar)
  }
  fetch(url, sendDetails)
    .then(response => response.json())
    .then((data) => {
      fetchAllCars()
    })
})

fetchAllCars();
