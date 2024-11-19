const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const orderModal = document.getElementById("order-modal");
const orderProductDetails = document.getElementById("order-product-details");

let products = [
  { 
    name: "Laptop", 
    price: 100000, 
    description: "2-year-old laptop, 8GB RAM, 256GB SSD,", 
    contact: "John@gmail.com", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHGxwrtYeMGFwDf6fLSMvFzUUxM-v92-UuYg&s"
  },
  { 
    name: "Bike", 
    price: 200000, 
    description: "Well-maintained, perfect for outdoor.", 
    contact: "Alex@gmail.com", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHOC0Aim7FjHL3QkpbESR-ykbBaZNTo-lnWA&s"
  },
  { 
    name: "Coffee Table", 
    price: 1000, 
    description: "Wooden table with glass top,minor scratches.", 
    contact: "Joe@gmail.com", 
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIVFRUVFRUVFRYXFRgVFRUVFRUWFhYVFRcYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAQFysZFRkrKystKy0rKysrLSstODcrNy4rLSstLS03Kzc3Ky03NystKysuKy0rLTcrLSsrKysrLf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EAEIQAAEDAQQFCQYFAgUFAQAAAAEAAhEDBBIhMQVBUWGRBhMUUnGBobHRIjJiksHhFUJygvAjogcWQ1PSY5OywuJz/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABwRAQEBAQEAAwEAAAAAAAAAAAARASESAlFhMf/aAAwDAQACEQMRAD8AtEJQjIQhZdAkLG09pxlmuhzS5zpMAgQBrM/zNbFZ4aC5xgAEk7AMyvKNN6QNes6ociYbuaMAETXTjlrSOdKoO9p+qL/N1A/lqD9o+hXDtEmFZ5puxWM1155T2c63j9h+iH8eoH/Ujta4fRclzA38fsl0dvxcR6KRfTrvxegf9Vvl5om6QpnKoz5guONlGpx4D1TdF+Lw+6Q9O4ZaAcnA/uCla9cD0M7W8D6IhZ3DJw7iR9ET07++U/OLgRzoyc7uqR9VI202gfnf88/VIV3jaqlbWXBN0laR+ap8s/RTN05aBmeLB6JB3jaykFZcI3lNWH+2f2n1UzeVVTWxh7yPqg6OrU5y0tGqiwu/fUlreDQ750dqpNqEsdkWEHUYdgY34rlrLyjcwvPNAl7y8m+RqDQMjgAAFY/zUA68aRxEYOB8wqIqXJRgbfvuvNc6RgW+y4gAgicoVp1BlHA4veS4Ma0XiXGTDW4AY7gqVp5ThzvYa6mHCKh9lziNV1sxe1ST3GFf0bpmzUwfZqSfee4Bz3fqN6foprWbsjQ0bTtLjLebpfqBqu7wCAOJWq2paaeL20qzddwGnUHY1xLXcQsilynpA4Mf2mBO/MqY8pG/CP1OcP8A0VzGUun67a9BootBc54DJF1wcAZB1tMAgjerNWpRrUKFxjWsqVKXswIF2XOYRuLIXO1dKtbW5wGmQ0B7hfugucC2WlwEujPuU/TmNLwxwuPu2qkJEsqNh1SmROBOz4nIL9rsXR6ofSY11K44mk50BpvNvczewafd9k4ZxCyrfpKhWr0WtLQwvBqhwDIuYhrp3+Su8p4qMbUuirTAdfZ7xAcBFRoH5mwe5xWNozQ1KpWqQy/QFNhaZMFzsyCDngcEG3yotNN9JrabmFwfTuXS0lp5xoBAG5dDY7XU5tpETjIMxIMGN0gx2riKOgaTqjWtDg0OvP8AaODQDAnMEmNeQK6fQdYhhpOMuoks7Wf6bu9sd4KDX/Fa3+00/uI+ir2qrXrsNN1NrJIJIfekAzGQ3KWlmrtNSKp2fRgDQDnrSV+UysWgcxRlqvPpqpaXBjXPcYa0FxOwDNRpyPL3SdymKLTi/F36Qcu8+S89Kvaat5r1n1DrOA2AZDgqICMJrO3WpZR0qeCOlRkxxRlKygLs4zHFGLKCJmMNa3tHaMY5k44gCcBqE6tqsfhYAwJyjcqjlDTbt+n0TimOstp+gx13d4lRHQZ6/wDb90GUaXxeXqn5reFonQjtThwKY6DqaizifRKRn8yf5Pom5oq8dCVdjeKB2i64/LwcPVFU7v8AJCJt7VKnNhrj8juM/VCbPVGbH/KT9EQJc7Xe8UPb4gHzRw8ZtPy/ZIVj/MEEdxvVb8o9ELqDT+UKwK3Z4+qLnNwQVBYmbPEo2UGnxHAqyHjq+Xome9uoYn+EoK5o7CY7uAwTGzYZq2CzYeH3QVarBhJE7p7zuVKzXWUxM5zOE7lA12EbuMLTq0j7wPs4dwJxIG3XjqKjdYWtMTekjVGBEyoVWp2RxF4RkTnjv70Vme5uTiJ2EjyU9lF112fdM9siPXioyyHEbMuxFx1Gg7T/AEwG4RnA17e9WK4eHCqzFzcC3K+3Z26wud0TaLj41OwPbqXSUqqjUauj7e2o0OacMiMi06w4aitGnXXL1aRvc7RIbU1g+5UGx2/4lYp6epgf1L1N4zpuaS4n4I9/uVHR88nXIus9pq/1DXNG9iKcTcGQB3xE7yUlUekPYuF/xJ0nzdMUGn2n4u/SDgO8+S7u02ljGue5wDWgk9gXhfKDShtNd9U/mJjc3UOELLTNUtnZJ7FGr1kpZfydyJqYNgQpqDPEx3a1p6a0ZzPN67zBP6x73mFScLv7RHe77IjqNEODqTSN44E/ZWnMVDkw6aRGx58QCtgsRlnupoCxXHtUb2oqsGIajgN6lfOoT3qCpJ97BE3TXZEmAO0p5IxBkeSQOrA7sfBHGGRHdKqU0lOX4b0bGzgU7aBmMwUKjY/bmhOOQCn5kjAd53oi0Dae1FqkaYP5Qe5O2xtP5G8Ap2nZhrx1pqmQ27tiJUL9GsI9wcI8lUZoymarhdwuNLRJzvPv6/0cQtmyumZ1JWmyh0GSCMWuGYOWGo9hwKLWPaNENwu4HYZg+OCgpaBbeF4nOYExhrJMk57uxbrQ9uLm3sM2DL9pM8CVh6T09cqFrGSBEl0tM5xBEhBatOirwwd7QEA58dsrMa1pnC64GHN6u8bjnKlp8qNtLg//AOVm6Qt/OOvNBBiMerEDvRIqU5NQnb5A3VPaqcAHZge/JWLBSv1Q8UqlRjQOcDGuJ/tymFPaKJgyx7QZzY4R3kBS9ispdBYK99oOsYHtXPhXdE17r7pydh36k3G8dAx0KdldVHIH1A0FxyAkqVdaPP70l55bNJPe9zgSATgJ1ZBJaZeh/wCJOmLlNtnafafi/c0av5uXm4V7TmkTaK76p1k3dzdSpKNU9NskBdNyZsl+qCRgz2j2jBo449ywbJT1rvOTFAMo3jm8z+0YN+p71GUmnGB1OTqcCPr4Lkq7sBv9o9+Xh5rtLa4S1xxDZw2nvXJWqyOLyBGIluyBAjdqVRf5M1ffG4HhIW46rvK5zk+0tqe0CAQRj3EeS3qqBnWjehNfeoHqMoLXPbwgqmcVA1GAqm4lFQgADBOXSMVCUN5GZqyHRq/nanbVJzOCqh6a+i9XX1jgR3hPfkYcCPqqQqwiFY7UOrIjdHj4Imxjd4EDwVdlVHzvYqykptvGDh2AKzRo3SYJPacJVJtW7jEqdlpgZD7qLmL7XjJeb6ReTUc45lzieOS7a0WyBl4ritKD23fqJ4mVcaVQUYKiCMFUa2gNNvsj3PY1rrzbrmumCJBBwMyI8Suks3+IjmxNlYY/6jvqCuHBRBBs8qNNNtdYVm0uaNwNcL14OIJh2QjAx3BYlVyNRhTVdLo21c7TB1jB3aPXA96y+VFtgCkDicXdmoKtoy3ii9173XNPzDFv1Hesq0VTUeXO14ncFlULaZKdJ1U6kkVYY1EG4wpBAG8+SOy05M9yG8XLFZy9zaYzcQOzaV6AymGgAZAADsAhc1yTssvdVOTRdb2nM8PNdK9yiKFWC7AmZ3QVmV3f1C2M8GknMDOIWrbaoY0uj3QY7dS5KpbHmJOUxgMJEYK1ncajDdqAERGMh0gyCMZxVt1du/gfRc+LW7cdWLQ7LeQl0v4KZ/YPoqdxuGoP4CgNVvWHFYotfwM7rw8nJdN+Hg94+qkwutsVB1hxRiodqwemjY7/ALh+oTttrdjx3tPm1WF36bpeU15Y7bc3a/5afoi6cOs75R9HJC/jUvpX1li2Dr8Wv/5pxbfjHB/1lTcX007yIFZgtvxt4x5sRNth6zfmb/xCQrUBRgrMFud8J72n/wBgj6e/qg9kf81Ylx0VkoD2PZDnPxAdi1rB+YjWdysVZuuFRrQZApgABxM7BqhZ1G24U6sj+mwtIxDi4A3boE5yOxKyaWZFN7sHUwQ4Q8l3VIIbqnWkKJ9jM/1AWtYL7sMY2DtWHbrY2al5jQzmzcAYJD8A0l2e2VuVNLUnNfTki80AEgtY2DIbiCcZMkqgKlNtKrf5qoAwugQ6HZN9ogRjqTODm26HcRTPONDqkQ1zagMnMSGEYZ55KOz2Utr06b/ba4h0tktczOQYBhav4jRNXnJMSXBouCHFl0l5LzeMYCIACOx1qdXF5LahptbIxawB5cQC0zBwGGxaqVBpis5tN4qCkPaHMhoAeAHYyBqurCo1nOcGtbecTAABJJ2ALb0to2lVquqAOAMa9gAnwVRuhgPdeQhVOvVdTJbUYWuGYIII14gpxOsRImO1Wfwr2/beXDA4jF24mVJbaRdLxk3PftjsU1rGXalV1QMzmr1RsqpdM4DE4DtWWoIEDBJTewMC28Rmdp1pIsS3ZwAUgLm4DVuUgsxGVRnzJCzvEw5mOftBF4KhpWswQ10DYJA81L+P2jrqobM/d3OBTcw/YicW6umqjxddiOH0VcWkdU/N9lGaTuqU9NhzuoTBm0t2FN0hvxeHqhuHH2SoXHcUSYm59u08PuhdVb1vAqs5+5RF6EXOcHWHj6JXvibxjzVG8leCpGi072/MPVP7W75h6rNvJ7yEaHtdUpod1TwKogpwVDyuEnYeCbnFXFY7TxT8+7rO4lDzqwaqFz8VD0h/WPmn6S7aPlHohNWmVFI2vv8AFUhaXfD8rfRF0r4W8ESb9LnSDtPEqa2aXquF1sMaSCQwReIymSVm8/8ACOJ9UxrDq+JVpN+k5r1OsfBT2Wq+80kzq1ZHs7lTFcbPFG21bvFKk/HRBhRhix2aZdsCmbpt3VHj6rJPxp22j/TkZzjubrVShHu6oiNyBmnDBBYDKq07WJmCqKtWldcWnUYVe0U9YWjpGqx5DmzMQ6d2UKsRgmtZ3ENCxFzQ7nGCdROISVarZjJhJB0DrGNg8EBsPwjiFec07CoiDsKsbuKnQD1U3QT1VavfyEJcp04qdF+EoXWaNoVwu3pF+9DiiaJ2nikaJ6x4q6UMlCKbqThrI7UNw7fAK+XFIPjUO8A+aExnlvYe4IYHVbwWgSOqM/4E1NwBm6124iR4JdIzjTZ1G+I+qbmWdUdxK0q7w4+4xu5oMeJKZtwOm5I2E/UJSM/mafV/uPolUpUz+SOxxx4grQfzZJIpAA+6Lzjd75x+6j5tvVHE+qnSYz+jM+LiD9E/RmfH4LSbTpmAZGOrZt39iapQZqc7vH3SmfFl9FbtdwHqh6MOsfl+60hSG/im5jf4BKvlRFlH+4R+z7pujf8AUHylX+j/ABeH3TGz7xwSkUeinrs8R9E3RndZnzK8bOdo8fRD0Y7uP2UqTVMWd3w/ME/MP2DiFaNlO7iEPRndXyVJqOnRds8UYaRmDwUps0fldPYc1H7Y6/ih0mg9U8CnLT1TwKE1H7/FN0hw1+CJNPeT30PTHbRwCJtqPVaT2eioYkJkXSh1WePqkhGw9zlXr1yBrV+owgkEQQqtopSCNohVNxR0bbxUqspOdcDjdvxME+7hsJgZ61Yt9Tmnvp3w4sJaSBgSM478O5c7UpFjo1g+WRVl9dzzji5xlxjEknE8URc/Ejs8B6oxpEbR3gpN0BahnZ6nBI6HqjOg/wCQoQXTmnWxLpbdrOKi/DXDOi8fsd6JdC2sdwKVZqYWhvw/MnFcbvm+6r9EGw+KIWRuw8Soqfnhs8SgdaBs8So+ht38Uuht3oohaBrBRGu3eg6INpRdFG0qBGs3af53JjXbtPBLovxHh90JsfxeH3SghaBn9E4rt2hALF8XgmNkPWCUTCqOsExrDaFAbI7aP53JCwu2t8fRUWWvB1jinns4qmbI4dXt/gTdGdsCHV6T/Cmnd5KgaT9QPH7oHMfsP870S60STsPh6pXjsPgs4GrsPEo2PqTF1387kLq8ah38EN7t4FVKj3jUZ2Qr7LKHURUvFp1yJkgkRGrJEuor/b4pFx3+KqGZzKM1TMFFTGpt8oVm1WQ02F0zGJEDLWZWe+qt+h7VNs62ieCJrnukt6o4BJV7RSLHFp1GO7V4JIV7ZpvQDK3tNhtTbqd+rfvXD22xOpuLXCCMwvVXhY+mrAys2Dg4e67ZuO5UeT6Ssk+2Mxn2bUfJyxc5aKYjAG87sZ7XnA71paQoFhLXDEYFVNDO5u00yOsB3O9k+aEegvKrPZKv8whdSAzRWcaCr16atWq3NbgMVkVq5cpoGq4KrUUkEqeho57tSis4snUjp2InUuhs2ho1LTo6M3KxmuZo6J2gcFaboVnVHBdNTsG5TNsi1CuVZoKmZ9gZ7Ef+XqfUHiumpWXdrPmpOjJErkzybpdXxPqhPJmnsPErrujoTZ1Zhdcg7kxT+LiozyXbtdxHouxNBCaCTC64w8lx1ncR6IHcmB1neC7Q0EDqCQrincmviPBRu5NHr/2/ddsaCB1BSF1xH+WHH8/9v3UVTkm//cHy/dd0KKTqKQrzTSWinUm3SZkXgRu1KpRkMDScJnvK7HlhdDWD80u+WMfGFyd1Z3GsRCzky7U2J78gNv2KXN61OGStex6EJAdUwGzWe3YmYbrLsWjzUOUN1n6BbjqIAgDJW2sDRdGAGQ3KKsUT+s91FpOICSJ5xTJSPUK1dVjJVunZdqe2WYim+M7ru3JWVd48+5Rm+S8CBhG8SQD4LAsGNel/+jBxcAtrlBVcJmMhhs2LnrJVu1GPxgOBBG0Y4d6u5GbXp+kNINpyBiVgWm1vfmcNiqMrXzrkrSsmj3vyC51vMUQxWrNo5z9S6TR/J4DF2K3aFga3ILWfHU35OZsWggMYWtR0ZC2RSjUnLVvMZ3WeyxBSizBWrqV1VFbmkubVghCQoK1NmHe7/wAinLFJTGHe7/yKchFVyxNzasQhhUQc2hNNWYQlqIrc0mNJWbqGEFU0kBpK5dQlqCkaSGrTVwtUdRiDzPlZXm0P2MAaO7PxJWJZ2OqODWiSTACu8q3xXeNr3n+6Fm6Pt/NVGubnl3EQfNYadro/RbKAl0OqbdTdzfVPaLUFk9Ic7ElT0bMSpSFVrYz3fz+a0OJ1K9S0YStCzaOkAwp1XOmzFJdV+HJK+Su8bRCkbSU0J4W2WJpHkxZq0l1OCcyz2Se0ZHgspnIGzB1433kZXiIA2ANAXYQldSIw7PoGizJgV1lmaMgFduoS1P4IbqeFJdT3VVRQmIUt1MWoIiEgEcJQoI3BDClIQQghpjDj5ooSpDAdiKEAFqAtUpCZURQmhSkISEEaEhSQmhBGQhhSwmIQROCEhSkJoRHmnLbk3VdUc+mwuBN4ECc82mMsVydHk/aS8A0nNE4k5AL3N4UbmDYsxXntl0W/qldFYtGxmFuc0Nie6mfGCo2gBqQtbBI7+Ofj5q2WqCq3I7D4HD0VDwknSQddCJPCUKoZJJKFAxQwiTFAMJQiTFAKYhEmKoGE0IkyigITEIyhQQ0vdHYPJEUqHut/SPJEQgjhMQpCEJCAITFHCaFRHCYtUhCZQRkIVKQgIVAFDCMpkETghIUjkCgjhMQpChIQRkKN7NSnKEhUV2DDEp01SzNJkykoOxSKSSqATpJKKYoSkkqhkkkkDFMUkkUyYpJKBJikkgho+639I8kZSSQMmSSRCKApJKgSmSSUUkzkySoByEJJKAXIUkkAuQpJIBKYpJKgUkkkH//Z"
  },
  {
    name: "Sofa Set",
    price: "10000",
    description: "A sofa set is a group of matching upholstered seating pieces for comfort and style.",
    contact: "janu@gmail.com",
    image: "data:image/jpeg;base64,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",
  },
];

let cart = [];
let selectedProduct = null;

// Show the selected section
function showSection(section) {
  document.getElementById("home-section").style.display = section === "home" ? "block" : "none";
  document.getElementById("cart-section").style.display = section === "cart" ? "block" : "none";
  document.getElementById("profile-section").style.display = section === "profile" ? "block" : "none";
}

// Display products in Home
function displayProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p><strong>Price:</strong> $${product.price}</p>
      <p>${product.description}</p>
      <p><strong>Contact Seller:</strong> ${product.contact}</p>
      <button onclick="addToCart(${index})"><i class="fas fa-cart-plus"></i> Add to Cart</button>
      <button onclick="orderNow(${index})"><i class="fas fa-credit-card"></i> Place Order</button>
    `;
    productList.appendChild(productElement);
  });
}

// Add a product to the cart
function addToCart(index) {
  const product = products[index];
  cart.push(product);
  displayCart();
}

// Show the order modal
function showOrderModal(product) {
  selectedProduct = product;
  orderProductDetails.innerHTML = `
    <strong>Product:</strong> ${product.name}<br>
    <strong>Price:</strong> $${product.price}
  `;
  orderModal.style.display = "flex"; // Show modal as a pop-up
}

// Close the order modal
function closeOrderModal() {
  orderModal.style.display = "none";
  selectedProduct = null;
}

// Place the order
function placeOrder() {
  const shippingAddress = document.getElementById("shipping-address").value;
  const contactNumber = document.getElementById("contact-number").value;

  if (!shippingAddress || !contactNumber) {
    alert("Please provide all the order details.");
    return;
  }

  alert(`Order placed successfully for ${selectedProduct.name}!\nShipping to: ${shippingAddress}`);
  
  cart = [];
  displayCart();
  closeOrderModal();
}

// Display cart items with Place Order option
function displayCart() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<p><i class='fas fa-info-circle'></i> No items in the cart.</p>";
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("product");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="product-image">
        <h3>${item.name}</h3>
        <p><strong>Price:</strong> $${item.price}</p>
        <p>${item.description}</p>
        <p><strong>Contact Seller:</strong> ${item.contact}</p>
        <button onclick="orderProduct(${index})"><i class="fas fa-credit-card"></i> Place Order</button>
      `;
      cartList.appendChild(cartItem);
    });
  }
}

// Place order directly from Home
function orderNow(index) {
  const product = products[index];
  showOrderModal(product);
}

// Place order from the cart
function orderProduct(cartIndex) {
  const product = cart[cartIndex];
  showOrderModal(product);
}

// Add a new product in Profile section
function addProduct(event) {
  event.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const description = document.getElementById("product-description").value;
  const contact = "you@example.com";
  const image = document.getElementById("product-image").value;

  const newProduct = { name, price, description, contact, image };
  products.push(newProduct);

  displayProducts();
  document.getElementById("product-form").reset();
}

// Initialize
displayProducts();
showSection('home');
