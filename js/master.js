//const cars = document.querySelectorAll(".data-ref");

const vm = new Vue({
  el: "#app",

  data: {
    carModel: "",
    carDescription: "",
    carPricing: ""
  },
  mounted: function() {
    // listen when Vue is done building
    console.log("mounted");

    this.addPreloader(document.querySelector(".modelInfo"));

    // get the data for the first car
    document.querySelector("#F55").click();
  },
  updated: function() {
    // listen for when Vue completes its update / render cycle
    console.log("updated");
    // remove the preloader after the page updates
    let preloader = document.querySelector(".preloader-wrapper");

    setTimeout(function() {
      preloader.classList.add("hidden");
      // debugger;
      // var preload = document.querySelector(".preloader");
      document.body.appendChild(preloader);
    }, 3000);
  },
  methods: {
    addPreloader(parentEl) {
      parentEl.appendChild(document.querySelector(".preloader-wrapper"));

      bodymovin.loadAnimation({
        wrapper: document.querySelector(".preloader"),
        animType: "svg",
        loop: true,
        path: "./data/search.json"
      });
    },
    getData(e) {
      //debugger;
      let targetURL = `./includes/connect.php?modelNo=${e.currentTarget.id}`;
      fetch(targetURL) // go get the data and bring it back
        .then(res => res.json()) // turn the result into a plain JS object
        .then(data => {
          console.log(data);

          this.showCarData(data[0]); // run a function to put the data on the page
        }) // let's see what we got
        .catch(function(error) {
          console.log(error); // if anything broke, log it to the console
        });
      //run a function to parse our data
    },

    showCarData(data) {
      //console.log(data);
      this.carModel = data.modelName;
      this.carDescription = data.modelDetails;
      this.carPricing = data.pricing;
    }
  }
});

// whenever we click on a thumbnail, pass its id to the php query

// function showCarData(data) {
//   //debugger;
//   //parse the db info and put it where it needs to go
//   const { modelName, pricing, modelDetails } = data; // destructuring assignment => MDN JS destructuring

//   document.querySelector(".modelName").textContent = modelName;
//   document.querySelector(".priceInfo").textContent = `$ ${pricing}.00`;
//   document.querySelector(".modelDetails").textContent = modelDetails;
// }
//cars.forEach(car => car.addEventListener("click", getData));
//getData(); // trigger the getData function
