const result = document.getElementById("items");
let products = [];

async function fetchProducts() {
   await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => products = data);
}

function itemsDisplay() {
    result.innerHTML = products.map((product) => 
    `
        <a href="./product.html?id=${product._id}">
            <article>
                <img src=${product.imageUrl} alt=${product.altTxt}>
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>  
    `
    )
    .join("");
}

fetchProducts().then(() => itemsDisplay());