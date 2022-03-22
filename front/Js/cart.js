let addProduct = JSON.parse(localStorage.getItem("product"));
let cartItems = document.getElementById("cart__items");

async function cartDisplay () {
    if (addProduct) {
        await addProduct;

        for ( let i = 0; i < addProduct.length; i++) {
          console.log(addProduct[i][0]);

          async function fetchProduct() {
            await fetch(`http://localhost:3000/api/products/${addProduct[i][0]}`)
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
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${addProduct[i].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article> 
          `)
        }

        
    };
};

cartDisplay();
    

    
