const productId = window.location.search.split("?").join("");
const productItem = document.getElementById("itemDetails");

let allProductDetails = [];


async function fetchProduct() {
    await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => allProductDetails = data);
}

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


let button = document.getElementById("addToCartButton");
    console.log(button);
    button.onclick = function(event) {
        console.log("kuku le bouton");
        let productDetails = [allProductDetails._id];
        let amountInput = document.getElementById("quantity");
        let select = document.getElementById("colors");
        let productFinalDetails = Object.assign({}, productDetails, {
            color: `${select.value}`,
            quantity: amountInput.value,
        });
        let productArray = JSON.parse(localStorage.getItem("product"));
        console.log(productArray);
        if (productArray == null ) {
            productArray = [];
            productArray.push(productFinalDetails);
            localStorage.setItem("product", JSON.stringify(productArray));
            productArray = JSON.parse(localStorage.getItem("product"));
            console.log(productArray.length);
        } else if (productArray != null) {
            for (var i = 0; i < productArray.length; i++) {
                if (productArray[i]._id == productDetails._id && productArray[i].color == select.value){
                    return(
                        productArray[i].quantity = parseInt(productArray[i].quantity) + parseInt(amountInput.value),
                        localStorage.setItem("product", JSON.stringify(productArray)),
                        productArray = JSON.parse(localStorage.getItem("product"))
                    );
                }
            }
            for (var i = 0; i < productArray.length; i++) {
                if (productArray[i]._id == productDetails._id && productArray[i].color != select.value || 
                    productArray[i]._id != productDetails._id ) {
                  return (
                    productArray.push(productFinalDetails),
                    localStorage.setItem("product", JSON.stringify(productArray)),
                    productArray = JSON.parse(localStorage.getItem("product"))
                  );
                }
            }
        }
    };  





    

