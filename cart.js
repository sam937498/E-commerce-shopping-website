let ShoppingCart = document.getElementById("ShoppingCart");
let subtotal = document.getElementById("subtotal");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search =
          shopItemsData.find((y) => {
            return y.id === id;
          }) || [];

        return `
         <tr>
           <td>
             <a onclick="removeItem(${id})" href="#"><i  class="fa-regular fa-circle-xmark" ></i></a>
           </td>
           <td><img src=${search.img} alt="" /></td>
           <td>${search.name}</td>
           <td>₹${search.price}</td>
           <td><div class="buttons">
                 <i onclick=decrement(${search.id}) class="fa fa-minus"></i>
                 <div id=${id} class="quantity">${item}</div>
                 <i onclick=increment(${search.id}) class="fa fa-plus"></i>
               </div>
           </td>
           <td>₹ ${item * search.price}</td>
         </tr>
         `;
      })
      .join(""));
  } else {
    return (ShoppingCart.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
    <button style="color: pink" class="w3-button w3-pink">Back to home</button>
      
    </a>
    `);
  }
};

generateCartItems();

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

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;

  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  calculation();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    console.log(amount);

    subtotal.innerHTML = `<h3><strong>Cart Totals</strong></h3>
          <table>
            <tr>
              <td>Cart Subtotal</td>
              <td>₹ ${amount}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>₹${amount}</strong></td>
            </tr>
          </table>
          <button class="w3-button w3-pink">Proceed to Checkout</button>
      `;
  } else return;
};

TotalAmount();
