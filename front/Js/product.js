const productId = window.location.search.split("?").join("");
const productItem = document.getElementById("itemDetails");

let productDetails = [];

async function fetchProduct() {
    await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => productDetails = data);
}

async function productDisplay() {
    await fetchProduct();
    productItem.innerHTML = `

            <article>
                <div class="item__img">
                    <img src="${productDetails.imageUrl}" alt="${productDetails.altTxt}">
                </div>
                <div class="item__content">

                <div class="item__content__titlePrice">
                <h1 id="title">${productDetails.name}</h1>
                <p>Prix : <span id="price">${productDetails.price}</span>€</p>
                </div>

                <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${productDetails.description}</p>
                </div>

                <div class="item__content__settings">
                <div class="item__content__settings__color">
                    <label for="color-select">Choisir une couleur :</label>
                    <select name="color-select" id="colors">
                        <option value="">--SVP, choisissez une couleur --</option>
                    </select>
                </div>

                <div class="item__content__settings__quantity">
                    <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                    <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
                </div>

                <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
                </div>

                </div>
            </article>
        
    `

    let select = document.getElementById("colors");
    
    productDetails.colors.forEach((color) => {
        let tagOption = document.createElement("option");

        tagOption.innerHTML = `${color} `;
        tagOption.value = `${color} `;

        select.appendChild(tagOption);
        addToCart(productDetails);
    });
};
productDisplay();

const addToCart = () => {
    let button = document.getElementById("addToCart");
    button.addEventListener("click", () => {
        let productArray = JSON.parse(localStorage.getItem("product"));
        let select = document.getElementById("colors");
        let amountInput = document.getElementById("quantity");
        console.log(amountInput.value);
        console.log(select.value);

        const fusionproductAndColor = Object.assign({}, productDetails, {color: `${select.value}`, amount: amountInput.value,});

        if (productArray == null) {
            productArray = [];
            productArray.push(fusionproductAndColor);
            productArray.amount += amountInput.value;
            localStorage.setItem("product", JSON.stringify(productArray));
        } else if (productArray != null) {
            for (i = 0; i < productArray.length; i++){
                console.log("test");
                if (productArray[i]._id == productDetails._id && productArray[i].color == select.value) {
                    return (
                        productArray[i].amount += amountInput.value,
                        productArray[0].amount += productArray[i].amount, 
                        console.log("quantite"),
                        localStorage.setItem("product",JSON.stringify(productArray)),
                        (productArray = JSON.parse(localStorage.getItem("product")))
                    );
                }
            }
            for (i = 0; i < productArray.length; i++) {
                if (productArray[i]._id == productDetails._id && productArray[i].color != productDetails.color){
                    return (
                        productArray.push(fusionproductAndColor),
                        localStorage.setItem("product",JSON.stringify(productArray))
                        (productArray = JSON.parse(localStorage.getItem("product")))
                    );
                }
            }
            for (i = 0; i < productArray.length; i++) {
                if (productArray[i]._id != productDetails._id){
                    return (
                        productArray.push(fusionproductAndColor),
                        localStorage.setItem("product",JSON.stringify(productArray))
                        (productArray = JSON.parse(localStorage.getItem("product")))
                    );
                }
            } 
        }
    });
    return productArray = JSON.parse(localStorage.getItem("product"));
    
};