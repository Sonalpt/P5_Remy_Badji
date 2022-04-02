let paramsId = (new URL(document.location)).searchParams;
let productId = paramsId.get("id");
const productItem = document.getElementById("itemDetails");

let allProductDetails = [];

// function to get data from a specific product, who got selected by the user on the landing page //

async function fetchProduct() {
    await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => allProductDetails = data)
    .catch((err) => {console.warn('Erreur dans la construction de la requête:' + err.stack);});
}

// function to display the details of a product, in product.html //

async function productDisplay() {
    await fetchProduct();

    let productImage = document.querySelector(".item__img");
    let productTitle = document.querySelector("#title");
    let productPrice = document.querySelector("#price");
    let productDescription = document.querySelector("#description");

    productImage.innerHTML = `<img src="${allProductDetails.imageUrl}" alt="${allProductDetails.altTxt}"> `;
    productTitle.innerHTML = `${allProductDetails.name}`;
    productPrice.innerHTML = `${allProductDetails.price}`;
    productDescription.innerHTML = `${allProductDetails.description}`;
    
    let select = document.getElementById("colors");
    
    allProductDetails.colors.forEach((color) => {
        let tagOption = document.createElement("option");

        tagOption.innerHTML = `${color} `;
        tagOption.value = `${color} `;

        select.appendChild(tagOption);
    });
};
productDisplay();

// function to add a specific product in cart, with all the conditions //

let button = document.getElementById("addToCartButton");
    console.log(button);
    button.onclick = function(event) {
        let amountInput = document.getElementById("quantity");
        let select = document.getElementById("colors");
        let productFinalDetails = Object.assign({}, { _id: allProductDetails._id, 
            color: `${select.value}`,
            quantity: amountInput.value,
        });
        let productArray = JSON.parse(localStorage.getItem("products"));
        if (productArray == null ) {
            productArray = [];
            if (parseInt(amountInput.value) <= 0) {
                alert("Vous devez ajouter un nombre d'articles entre 1 et 100")
                return;
            }
            else if (amountInput.value > 100) {
                alert("Vous ne pouvez pas avoir plus de 100 exemplaires du même article dans votre panier")
                return;
            } else {
            productArray.push(productFinalDetails);
            localStorage.setItem("products", JSON.stringify(productArray));
            productArray = JSON.parse(localStorage.getItem("products"));
            }
        } else if (productArray != null) {
            for (var i = 0; i < productArray.length; i++) {
                if (productArray[i]._id == allProductDetails._id && productArray[i].color != select.value || 
                    productArray[i]._id != allProductDetails._id ) {
                        if (parseInt(amountInput.value) <= 0) {
                            alert("Vous devez ajouter un nombre d'articles entre 1 et 100")
                            return;
                        }
                        else if (amountInput.value > 100) {
                            alert("Vous ne pouvez pas avoir plus de 100 exemplaires du même article dans votre panier")
                            return
                        } else {
                    return (
                    productArray.push(productFinalDetails),
                    localStorage.setItem("products", JSON.stringify(productArray)),
                    productArray = JSON.parse(localStorage.getItem("products"))
                    );
                    }
                }
                if (productArray[i]._id == allProductDetails._id && productArray[i].color == select.value){
                    if (parseInt(amountInput.value) <= 0) {
                        alert("Vous devez ajouter un nombre d'articles entre 1 et 100")
                        return;
                    }
                    else if (parseInt(productArray[i].quantity) + parseInt(amountInput.value) > 100) {
                        alert("Vous ne pouvez pas avoir plus de 100 exemplaires du même article dans votre panier")
                        return;
                    } else {
                    return(
                        productArray[i].quantity = parseInt(productArray[i].quantity) + parseInt(amountInput.value),
                        localStorage.setItem("products", JSON.stringify(productArray)),
                        productArray = JSON.parse(localStorage.getItem("products"))
                    );
                    }
                }
                
            }
        }
    };  





    

