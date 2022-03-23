let addProduct = JSON.parse(localStorage.getItem("product"));
let cartItems = document.getElementById("cart__items");
let totalCost = 0;
let totalOfArticles = 0;


async function cartDisplay () {
    if (addProduct) {
        await addProduct;

        for ( let i = 0; i < addProduct.length; i++) {

          async function fetchProduct() {
            await fetch(`http://localhost:3000/api/products/${addProduct[i][0]}`)
            .then((res) => res.json())
            .then((data) => productCartDetails = data);
          }
          await fetchProduct();

          cartItems.insertAdjacentHTML("beforebegin", ` 

            <article class="cart__item" data-id="${addProduct[i]["0"]}" data-color="${addProduct[i].color}">
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
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" data-id="${addProduct[i]["0"]}" data-color="${addProduct[i].color}"
                     value="${addProduct[i].quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${addProduct[i]["0"]}" data-color="${addProduct[i].color}" >Supprimer</p>
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
            localStorage.removeItem("product"),
            location.reload()
          )
        }
        else if (addProduct[i]["0"] == remove.dataset.id && addProduct[i].color == remove.dataset.color) {
          return (
            addProduct.splice(i, 1),
            console.log(addProduct),
            localStorage.setItem("product", JSON.stringify(addProduct)),
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
            localStorage.setItem("product", JSON.stringify(addProduct)),
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










    

    
