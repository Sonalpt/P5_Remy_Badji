let orderId = document.getElementById('orderId');
let orderIdValue = window.location.search.split("?orderId=").join("");
console.log(orderIdValue);
console.log(orderId);

orderId.innerHTML = `${orderIdValue}`;
