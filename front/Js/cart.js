let addProduct = JSON.parse(localStorage.getItem("product"));
let cartItems = document.getElementById("cart__items");

async function cartDisplay () {
    if (addProduct) {
        await addProduct;

        cartItems.innerHTML = addProduct.map((product) => `
            <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                    <div class="cart__item__img">
                      <img src="${product.imageUrl}" alt="${product.altTxt}">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.color}</p>
                        <p>${product.price} euros</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : ${product.amount}</p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>
            `,)
    };
};

cartDisplay();
    

    
