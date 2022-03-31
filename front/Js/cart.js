let addProduct = JSON.parse(localStorage.getItem("products"));
let cartItems = document.getElementById("cart__items");
let totalCost = 0;
let totalOfArticles = 0;

// the function who contains every display functions and settings in cart.html //
async function cartDisplay () {
    if (addProduct) {
        await addProduct;

        for ( let i = 0; i < addProduct.length; i++) {

          // function to get all needed data to display, for each product in the local storage //
          async function fetchProduct() {
            await fetch(`http://localhost:3000/api/products/${addProduct[i]._id}`)
            .then((res) => res.json())
            .then((data) => productCartDetails = data);
          }
          await fetchProduct();
          // this function displays every needed data of each product contained in localstorage, directly on the page //
          cartItems.insertAdjacentHTML("beforebegin", ` 

            <article class="cart__item" data-id="${addProduct[i]._id}" data-color="${addProduct[i].color}">
              <div class="cart__item__img">
                <img src="${productCartDetails.imageUrl}" alt="${productCartDetails.altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${productCartDetails.name}</h2>
                  <p>${addProduct[i].color}</p>
                  <p>${productCartDetails.price} euros</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" data-id="${addProduct[i]._id}" data-color="${addProduct[i].color}"
                     value="${addProduct[i].quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${addProduct[i]._id}" data-color="${addProduct[i].color}" >Supprimer</p>
                  </div>
                </div>
              </div>
            </article> `
          )
            
          let productCost = parseInt(productCartDetails.price) * parseInt(addProduct[i].quantity);

          totalCost += productCost;
          totalOfArticles += parseInt(addProduct[i].quantity);
    
        }

        
        totalPrice.innerHTML = `${totalCost}`;
        totalQuantity.innerHTML = `${totalOfArticles}`;

        quantityChange();

        removeProduct();

        signUp();
        
        

        
    };
};

cartDisplay();

// function who allow the user to delete a specific product from the cart, by clicking on "Supprimer", in the specific product space //
const removeProduct = async (cartDisplay) => {
  await cartDisplay;
  console.log ("yo je remove");
  let removeButton = document.querySelectorAll(".deleteItem");
  console.log(removeButton);
  removeButton.forEach((remove) => {
    remove.addEventListener("click", () => {
      console.log("supprimer");
      for(let i = 0; i < addProduct.length; i++){
        if (addProduct.length == 1) {
          return (
            localStorage.removeItem("products"),
            location.reload()
          )
        }
        else if (addProduct[i]._id == remove.dataset.id && addProduct[i].color == remove.dataset.color) {
          return (
            addProduct.splice(i, 1),
            console.log(addProduct),
            localStorage.setItem("products", JSON.stringify(addProduct)),
            location.reload()
          )
        }
      }
    })
  })
};

// function who allow the user to change the quantity of a specific product from the cart, by adjusting "Qté" input in the specific product space //
const quantityChange = async (cartDisplay) => {
  await cartDisplay;
  console.log("yo le rap");
  let itemQuantityChange = document.querySelectorAll(".itemQuantity");
  console.log(itemQuantityChange);
  itemQuantityChange.forEach((change) => {
    change.addEventListener("change", () => {
      console.log("test du changement");
      for(let i = 0; i < addProduct.length; i++){
        if(addProduct[i]._id == change.dataset.id && addProduct[i].color == change.dataset.color) {
          return (
            console.log(change.value),
            addProduct[i].quantity = parseInt(change.value),
            console.log(addProduct[i].quantity),
            localStorage.setItem("products", JSON.stringify(addProduct)),
            console.log("ajouté!"),
            productCost = parseInt(productCartDetails.price) * parseInt(addProduct[i].quantity),
            console.log(productCost),
            location.reload()
          );
        }
      }
    })
  })
};

// This function manage everything about the contact form, from the regex rules to the fetch POST step //
async function signUp() {
  let order = document.querySelector(".cart__order__form");
  console.log(order);

  // firstName regex validation function //
  const validFirstName = function() {

    let firstNameInput = order.firstName.value;
    console.log(firstNameInput);
    
    let firstNameRegExp = new RegExp ("^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$", "i");
    
    if (firstNameRegExp.test(firstNameInput)) {
      let firstNameError = document.getElementById("firstNameErrorMsg");
      firstNameError.innerHTML = " ";
      console.log("formulaire valide!");
      return true;
    } else {
      console.log("probleme");
      let firstNameError = document.getElementById("firstNameErrorMsg");
      firstNameError.innerHTML = "Le prénom n'est pas valide !";
      return false;
    }
  } 

  // lastName regex validation function //
  const validLastName = function() {

    let lastNameInput = order.lastName.value;
    console.log(lastNameInput);

    let lastNameRegExp = new RegExp ("^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$", "i");

    if (lastNameRegExp.test(lastNameInput)) {
      let lastNameError = document.getElementById("lastNameErrorMsg");
      lastNameError.innerHTML = " ";
      console.log("formulaire valide!");
      return true;
    } else {
      console.log("probleme");
      let lastNameError = document.getElementById("lastNameErrorMsg");
      lastNameError.innerHTML = "Le nom de famille n'est pas valide !";
      return false;
    }
  } 

  // city regex validation function //
  const validCity = function() {

    let cityInput = order.city.value;
    console.log(cityInput);
    
    let cityRegExp = new RegExp ("^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$", "i");
    
    if (cityRegExp.test(cityInput)) {
      let cityError = document.getElementById("cityErrorMsg");
      cityError.innerHTML = " ";
      console.log("formulaire valide!");
      return true;
    } else {
      console.log("probleme");
      let cityError = document.getElementById("cityErrorMsg");
      cityError.innerHTML = "Le nom de la ville n'est pas valide";
      return false;
    }
  } 

  // email regex validation function //
  const validEmail = function() {

    let emailInput = order.email.value;
    console.log(emailInput);

    let emailRegExp = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");

    if (emailRegExp.test(emailInput)) {
      let emailError = document.getElementById("emailErrorMsg");
      emailError.innerHTML = " ";
      console.log("formulaire valide!");
      return true;
    } else {
      console.log("probleme");
      let emailError = document.getElementById("emailErrorMsg");
      emailError.innerHTML = "Ceci n'est pas un email valide ! ";
      return false;
    }
  }

  order.firstName.addEventListener("change", () => {
    validFirstName(this);
  })

  order.lastName.addEventListener("change", () => {
    validLastName(this);
  })

  order.city.addEventListener("change", () => {
    validCity(this);
  })

  order.email.addEventListener("change", () => {
    validEmail(this);
  })

  // on submit, the fetch POST function //
  order.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstNameInput = order.firstName.value;
    let lastNameInput = order.lastName.value;
    let emailInput = order.email.value;
    if (validFirstName(firstNameInput) && validLastName(lastNameInput) && validEmail(emailInput)){

      let products = [];
      for (let i = 0; i < addProduct.length; i++) {
        products.push(addProduct[i]._id);
      }
      console.log(products);

      const newCustomer = {

        contact: {
          firstName: order.firstName.value,
          lastName: order.lastName.value,
          address: order.address.value,
          city: order.city.value,
          email: order.email.value,
        },
        products
      };
 
      const newCustomerData = JSON.stringify(newCustomer);

      console.log("formulaire finement validé !");
      /* localStorage.setItem("contact", JSON.stringify(formContact)); */

       fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newCustomerData,
      }).then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response.orderId);
        localStorage.removeItem("products");
        window.location.href = 'confirmation.html?orderId=' + response.orderId;
      })
      .catch((err) => {console.warn('Erreur dans la construction de la requête:' + err.stack);});
      
    } else {
      return;
    }
  })
}











    

    
