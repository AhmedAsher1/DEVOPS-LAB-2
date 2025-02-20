// Function to View Product and Store Details in localStorage
// Function to store product details in localStorage
function viewProduct(name, price, image, description) {
    // Store product details in localStorage
    localStorage.setItem("productName", name);
    localStorage.setItem("productPrice", price);
    localStorage.setItem("productImage", image);
    localStorage.setItem("productDescription", description); // Store product description
  
    // Redirect to product.html
    window.location.href = "product.html";
  }
  window.onload = function () {
    // Retrieve product details from localStorage
    const productName = localStorage.getItem("productName");
    const productPrice = localStorage.getItem("productPrice");
    const productImage = localStorage.getItem("productImage");
    const productDescription = localStorage.getItem("productDescription");
  
    // Display the product details
    if (productName && productPrice && productImage && productDescription) {
      document.getElementById("product-name").textContent = productName;
      document.getElementById("product-price").textContent = `$${productPrice}`;
      document.getElementById("product-image").src = productImage;
      document.getElementById("product-desc").textContent = productDescription; // Display description
    } else {
      console.error("Product details are missing or incomplete.");
    }
  };
// Size Selection and Cart Handling
document.addEventListener("DOMContentLoaded", function () {
  const sizeButtons = document.querySelectorAll(".size-btn");
  let selectedSize = "";

  sizeButtons.forEach(button => {
      button.addEventListener("click", function () {
          sizeButtons.forEach(btn => btn.classList.remove("selected"));
          this.classList.add("selected");
          selectedSize = this.textContent;

          let label = document.getElementById("size-label");
          if (!label) {
              label = document.createElement("span");
              label.id = "size-label";
              label.classList.add("size-label");
              this.parentNode.appendChild(label);
          }
          label.textContent = `Selected: ${selectedSize}`;
      });
  });

  document.getElementById("add-to-cart")?.addEventListener("click", function (event) {
    event.preventDefault();

    const productName = localStorage.getItem("productName");
    const productPrice = localStorage.getItem("productPrice");
    const productImage = localStorage.getItem("productImage");
    const productDescription = localStorage.getItem("productDescription");
    const selectedSize = document.querySelector(".size-btn.selected")?.textContent || "Default Size";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.name === productName && item.size === selectedSize);

    if (existingProduct) {
        existingProduct.quantity = 1; // Ensure quantity remains 1
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            description: productDescription,
            size: selectedSize,
            quantity: 1 // Ensure the default quantity is always 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "addtocart.html";
});



  if (window.location.pathname.includes("addtocart.html")) {
      initCart();
  }
});

// Function to Initialize the Cart
function initCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let total = 0;

  if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
      cartItemsContainer.innerHTML = "";
      cart.forEach((item, index) => {
          total += parseFloat(item.price) * parseInt(item.quantity);

          const cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");
          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <p>${item.name} - $${item.price} x ${item.quantity}</p>
              <p>Size: ${item.size}</p>
              <p>Description: ${item.description}</p>
              <button class="remove-item" data-index="${index}">Remove</button>
          `;
          cartItemsContainer.appendChild(cartItem);
      });

      document.querySelectorAll(".remove-item").forEach(button => {
          button.addEventListener("click", function () {
              let index = this.getAttribute("data-index");
              cart.splice(index, 1);
              localStorage.setItem("cart", JSON.stringify(cart));
              location.reload();
          });
      });
  }
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Image Slider Functionality
let currentIndex = 0;
let images;

document.addEventListener("DOMContentLoaded", function () {
  images = document.querySelectorAll(".slider-img");
  const totalImages = images.length;

  document.getElementById("next-btn")?.addEventListener("click", function () {
      if (totalImages > 0) {
          images[currentIndex].style.display = "none";
          currentIndex = (currentIndex + 1) % totalImages;
          images[currentIndex].style.display = "block";
      }
  });

  document.getElementById("prev-btn")?.addEventListener("click", function () {
      if (totalImages > 0) {
          images[currentIndex].style.display = "none";
          currentIndex = (currentIndex - 1 + totalImages) % totalImages;
          images[currentIndex].style.display = "block";
      }
  });

  if (totalImages > 0) {
      images.forEach((img, index) => {
          img.style.display = index === 0 ? "block" : "none";
      });
  }

  // Accordion Functionality
  document.querySelectorAll(".accordion-header").forEach(button => {
      button.addEventListener("click", () => {
          const content = button.nextElementSibling;
          content.style.display = content.style.display === "block" ? "none" : "block";
          button.querySelector(".arrow").textContent = content.style.display === "block" ? "▲" : "▼";
      });
  });

  // Quantity and Total Price Calculation
  const quantityInput = document.getElementById("quantity");
  const totalPriceSpan = document.getElementById("total-price");

  function updateTotal() {
      let quantity = parseInt(quantityInput.value) || 1;
      let price = parseFloat(localStorage.getItem("productPrice")) || 0;
      totalPriceSpan.textContent = `$${(quantity * price).toFixed(2)}`;
  }

  if (quantityInput) {
      quantityInput.addEventListener("input", updateTotal);
  }

  document.getElementById("orderForm")?.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Order placed successfully!");
  });
   

  //INDEX SLIDER
  let currentSlide = 0;

function slide(direction) {
    const slider = document.querySelector('.best-seller.slider');
    const items = document.querySelectorAll('.best-p1');
    const totalItems = items.length;
    const itemsPerSlide = 3; // Adjust this based on how many are visible

    // Calculate max slides based on visible items
    const maxSlides = Math.ceil(totalItems / itemsPerSlide) - 1;

    // Update the current slide index
    currentSlide += direction;

    // Ensure the current slide index stays within bounds
    if (currentSlide < 0) {
        currentSlide = 0;
    } else if (currentSlide > maxSlides) {
        currentSlide = maxSlides;
    }

    // Calculate the transform value
    const transformValue = -currentSlide * (100 / itemsPerSlide);
    slider.style.transform = `translateX(${transformValue}%)`;
}

// Ensure slider buttons exist and are working
document.querySelector(".prev")?.addEventListener("click", () => slide(-1));
document.querySelector(".next")?.addEventListener("click", () => slide(1));


});

document.getElementById("add-to-cart")?.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get product details from localStorage
    const productName = localStorage.getItem("productName");
    const productPrice = localStorage.getItem("productPrice");
    const productImage = localStorage.getItem("productImage");
    const productDescription = localStorage.getItem("productDescription");
    const selectedSize = document.querySelector(".size-btn.selected")?.textContent || "Default Size";
  
    // Add product to cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      name: productName,
      price: productPrice,
      image: productImage,
      description: productDescription,
      size: selectedSize,
      quantity: 1, // Default quantity is 1
    });
  
    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Redirect to cart page
    window.location.href = "addtocart.html";
  });

  // Allow selecting size
  document.querySelectorAll(".size-btn").forEach(button => {
      button.addEventListener("click", function () {
          document.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("selected"));
          this.classList.add("selected");
      });
  });


