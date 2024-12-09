let shop = document.querySelector(".pro-container");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
         <div class="pro" id="${id}">
            <img  onclick="window.location.href='sproduct.html'" src="${img}" alt="" />
            <div class="des">
              <span>${name}</span>
              <h5>${desc} </h5>
              <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <div>&#8377;${price}</div>
            </div>
            <button onclick=increment(${id})><i class="fa-solid fa-cart-shopping cart"></i></button> 
          </div>
      
      
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartnumber");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();
