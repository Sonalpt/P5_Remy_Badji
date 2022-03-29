let addProduct = JSON.parse(localStorage.getItem("product-ID"));
let cartItems = document.getElementById("cart__items");
let totalCost = 0;
let totalOfArticles = 0;


async function cartDisplay () {
    if (addProduct) {
        await addProduct;

        for ( let i = 0; i < addProduct.length; i++) {

          async function fetchProduct() {
            await fetch(`http://localhost:3000/api/products/${addProduct[i]._id}`)
            .then((res) => res.json())
            .then((data) => productCartDetails = data);
          }
          await fetchProduct();

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
            localStorage.removeItem("product-ID"),
            location.reload()
          )
        }
        else if (addProduct[i]["0"] == remove.dataset.id && addProduct[i].color == remove.dataset.color) {
          return (
            addProduct.splice(i, 1),
            console.log(addProduct),
            localStorage.setItem("product-ID", JSON.stringify(addProduct)),
            location.reload()
          )
        }
      }
    })
  })
};

const quantityChange = async (cartDisplay) => {
  await cartDisplay;
  console.log("yo le rap");
  let itemQuantityChange = document.querySelectorAll(".itemQuantity");
  console.log(itemQuantityChange);
  itemQuantityChange.forEach((change) => {
    change.addEventListener("change", () => {
      console.log("test du changement");
      for(let i = 0; i < addProduct.length; i++){
        if(addProduct[i]["0"] == change.dataset.id && addProduct[i].color == change.dataset.color) {
          return (
            console.log(change.value),
            addProduct[i].quantity = parseInt(change.value),
            console.log(addProduct[i].quantity),
            localStorage.setItem("product-ID", JSON.stringify(addProduct)),
            console.log("ajouté!"),
            productCost = parseInt(productCartDetails.price) * parseInt(addProduct[i].quantity),
            console.log(productCost),
            location.reload()
          );
        }
      }
    })
  });
}

async function signUp() {
  let order = document.querySelector(".cart__order__form");
  console.log(order);

  const validFirstName = function() {

    let firstNameInput = order.firstName.value;
    console.log(firstNameInput);
    
    let firstNameRegExp = new RegExp ("^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$", "i");
    
    if (firstNameRegExp.test(firstNameInput)) {
      console.log("formulaire valide!");
      return true;
    } else {
      console.log("probleme");
      let firstNameError = document.getElementById("firstNameErrorMsg");
      firstNameError.innerHTML = "Le prénom n'est pas valide !";
      return false;
    }
  } 

  const validLastName = function() {

    let lastNameInput = order.lastName.value;
    console.log(lastNameInput);

    let lastNameRegExp = new RegExp ("^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$", "i");

    if (lastNameRegExp.test(lastNameInput)) {
      console.log("formulaire valide!");
      return true;
    } else {
      console.log("probleme");
      let lastNameError = document.getElementById("lastNameErrorMsg");
      lastNameError.innerHTML = "Le nom de famille n'est pas valide !";
      return false;
    }
  }

  const validEmail = function() {

    let emailInput = order.email.value;
    console.log(emailInput);

    let emailRegExp = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");

    if (emailRegExp.test(emailInput)) {
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

  order.email.addEventListener("change", () => {
    validEmail(this);
  })

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

     
      let fetchResult = "";

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
      })
      
    } else {
      return;
    }
  })
}











    

    
