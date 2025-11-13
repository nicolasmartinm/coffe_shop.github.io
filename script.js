// Navigation function
function navigateTo(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active")
  })
  document.getElementById(screenId).classList.add("active")
  closeSidebar()

  if (screenId === "cart-screen") {
    updateCartDisplay()
  }

  if (screenId === "invoice-screen") {
    updateInvoiceDisplay()
  }
}

// Tab switching for auth
function switchTab(tab) {
  document.querySelectorAll(".tab").forEach((t) => {
    t.classList.remove("active")
  })

  if (tab === "login") {
    document.querySelector(".tab:first-child").classList.add("active")
    document.getElementById("login-form").classList.remove("hidden")
    document.getElementById("register-form").classList.add("hidden")
  } else {
    document.querySelector(".tab:last-child").classList.add("active")
    document.getElementById("login-form").classList.add("hidden")
    document.getElementById("register-form").classList.remove("hidden")
  }
}

// Cart functionality
const cart = {
  items: [],
  total: 0,
}

let currentProduct = null
let currentProductQuantity = 1

const extras = {
  dulces: { name: "Paquete de Dulces", price: 2500, quantity: 0 },
  papas: { name: "Paquete de papas", price: 2500, quantity: 0 },
  jugo: { name: "Jugo Hit", price: 3000, quantity: 0 },
  galletas: { name: "Galletas", price: 2000, quantity: 0 },
  agua: { name: "Agua", price: 1500, quantity: 0 },
  chocolate: { name: "Chocolatina", price: 2200, quantity: 0 },
}

const productsDB = {
  "Combo de Hamburguesa": {
    price: 12500,
    description:
      "Deliciosa hamburguesa con papas fritas y bebida. Carne 100% res, vegetales frescos y nuestras salsas especiales.",
    category: "combos",
    imageSrc: "https://polloslariviera.com/wp-content/uploads/2022/10/LA-RIVIERA_Combo-H-sencilla-10oz.jpg",
  },
  "Combo Desayuno": {
    price: 15000,
    description: "Desayuno completo con huevos, pan tostado, jugo natural y café. El inicio perfecto para tu día.",
    category: "combos",
    imageSrc: "https://tofuu.getjusto.com/orioneat-local/resized2/EhPavymh7EenLn8mN-300-x.webp",
  },
  Empanadas: {
    price: 3500,
    description: "Empanadas crujientes rellenas de carne o pollo. Preparadas al momento con ingredientes frescos.",
    category: "snacks",
    imageSrc: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhBds6LPYRkJfhfAOwhIrbXaWkdiCynr3YRQwk4Lwy3EpKi96I_qJw594Ahc-IiWVH6B4Qj8hYWlxQtKw-g0nZgR7AyvlimsNYZTKYE8JJaF4zJq7b-DkFwhLQgGEMNbhnoo3p675cSBswEcTCpKAtRgR0Ro7-9jW4gxHq5CmgLwCABYWfcZpHXpz3qvQ/s16000-rw/empanadas-venezolanas.JPG",
  },
  Croissant: {
    price: 4500,
    description: "Croissant de mantequilla recién horneado, suave por dentro y crujiente por fuera.",
    category: "snacks",
    imageSrc: "https://www.restauracioncolectiva.com/storage/FotoNota/croissant_origen.webp_1.webp",
  },
  "Sandwich Club": {
    price: 8500,
    description: "Sandwich triple con jamón, queso, tomate, lechuga y mayonesa. Acompañado de papas criollas.",
    category: "snacks",
    imageSrc: "https://imag.bonviveur.com/sandwich-club.webp",
  },
  "Tostadas Francesas": {
    price: 7000,
    description: "Tostadas francesas con miel de maple, frutas frescas y crema batida.",
    category: "snacks",
    imageSrc: "https://images.cookforyourlife.org/wp-content/uploads/2018/03/French-Toast-with-Tahini-and-Yogurt-e1721066794966.jpg",
  },
  Gaseosa: {
    price: 2500,
    description: "Gaseosa fría en presentación de 350ml. Variedad de sabores disponibles.",
    category: "bebidas",
    imageSrc: "data:image/jpeg;base64,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",
  },
  "Jugo Natural": {
    price: 5000,
    description: "Jugo natural preparado con frutas frescas. Sin azúcar añadida ni conservantes.",
    category: "bebidas",
    imageSrc: "https://www.mycolombianrecipes.com/wp-content/uploads/2009/04/Mango-Juice-Jugo-de-Mango.jpg",
  },
  Limonada: {
    price: 4000,
    description: "Limonada natural con hielo picado y menta fresca. Perfecta para refrescarte.",
    category: "bebidas",
    imageSrc: "https://cdnx.jumpseller.com/magnifique1/image/65465114/thumb/719/959?1752774094",
  },
  "Smoothie de Frutas": {
    price: 6500,
    description: "Batido cremoso de frutas mixtas con yogurt. Rico en vitaminas y delicioso.",
    category: "bebidas",
    imageSrc: "https://www.gimmesomeoven.com/wp-content/uploads/2015/04/Tropical-Smoothie-4.jpg",
  },
  Helados: {
    price: 3500,
    description: "Helado artesanal en variedad de sabores. Cremoso y refrescante.",
    category: "postres",
    imageSrc: "https://upload.wikimedia.org/wikipedia/commons/3/31/Ice_Cream_dessert_02.jpg",
  },
  "Torta de Chocolate": {
    price: 5500,
    description: "Porción de torta de chocolate con cobertura de ganache. Intenso sabor a cacao.",
    category: "postres",
    imageSrc: "https://cocinaperuana.espaciolatino.com/recetas-de-dulces/img600/torta-de-chocolate.jpg",
  },
  Cheesecake: {
    price: 6000,
    description: "Cheesecake cremoso sobre base de galleta. Con salsa de frutos rojos.",
    category: "postres",
    imageSrc: "https://tastesbetterfromscratch.com/wp-content/uploads/2017/12/Chocolate-Mousse-Cheesecake24-1-150x150.jpg",
  },
  Brownie: {
    price: 4500,
    description: "Brownie de chocolate servido tibio. Crujiente por fuera, suave por dentro.",
    category: "postres",
    imageSrc: "/brownie.jpghttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiva12CE8YLXK_AletmL_vKXClggGkMOl0Xg&s",
  },
  "Café Americano": {
    price: 3000,
    description: "Café americano preparado con granos 100% colombianos. Suave y aromático.",
    category: "cafes",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcD8sC5R0AGz_lJjovVhZUuE1WRVg3A0qryA&s",
  },
  Cappuccino: {
    price: 4000,
    description: "Cappuccino con espuma de leche perfecta. Balance ideal entre café y leche.",
    category: "cafes",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFRs5fJe09TJXAfvTg0jCfg2B6tjhZwjaKkg&s",
  },
  Latte: {
    price: 4500,
    description: "Latte suave con arte en la espuma. Preparado con leche fresca y espresso.",
    category: "cafes",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3wl1QYQB7W5I4rmP1rI4jGl4s0bRc_kb_Ow&s",
  },
  Espresso: {
    price: 2500,
    description: "Espresso intenso y concentrado. Para los verdaderos amantes del café.",
    category: "cafes",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaWbWssXusqLv36cEBtICoRMRJJ8nCqh1GbQ&s",
  },
  Mocha: {
    price: 5000,
    description: "Café mocha con chocolate y crema batida. Dulce y delicioso.",
    category: "cafes",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43NuGtjZsGRQPuThj7qcl8VCOBBzfbiP69g&s",
  },
  "Café Frío": {
    price: 5500,
    description: "Café frío con hielo y leche. Perfecto para días calurosos.",
    category: "cafes",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRk36OlBK7P7DfSdOTrbxAVNbYjAs7_6jvsg&s",
  },
}

function viewProductDetails(name, imageSrc, description, price) {
  currentProduct = { name, price, imageSrc, description }
  currentProductQuantity = 1
  document.getElementById("product-quantity").textContent = "1"

  document.getElementById("product-detail-title").textContent = name
  document.getElementById("product-detail-name").textContent = name
  document.getElementById("product-detail-price").textContent = price.toLocaleString("es-CO") + "$"
  document.getElementById("product-detail-description").textContent = description

  // Actualizar la imagen del producto
  const imgElement = document.querySelector("#product-detail-image img")
  imgElement.src = imageSrc

  navigateTo("product-detail-screen")
}

function updateProductQuantity(change) {
  const newQuantity = currentProductQuantity + change
  if (newQuantity >= 1 && newQuantity <= 99) {
    currentProductQuantity = newQuantity
    document.getElementById("product-quantity").textContent = newQuantity
  }
}

function addToCartFromDetail() {
  if (currentProduct) {
    const existingItemIndex = cart.items.findIndex((item) => item.name === currentProduct.name)

    if (existingItemIndex !== -1) {
      // Si el producto ya existe, sumamos la cantidad
      cart.items[existingItemIndex].quantity += currentProductQuantity
    } else {
      // Si no existe, lo agregamos como nuevo
      cart.items.push({
        name: currentProduct.name,
        price: currentProduct.price,
        quantity: currentProductQuantity,
        imageSrc: currentProduct.imageSrc,
      })
    }

    cart.total += currentProduct.price * currentProductQuantity

    // Mostrar mensaje de confirmación personalizado
    showAddedToCartMessage()

    // Reiniciar la cantidad a 1
    currentProductQuantity = 1
    document.getElementById("product-quantity").textContent = "1"
  }
}

function showAddedToCartMessage() {
  const message = document.createElement("div")
  message.className = "cart-notification"
  message.innerHTML = `
    <div class="cart-notification-content">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>Producto agregado al carrito</span>
    </div>
  `
  document.body.appendChild(message)

  // Mostrar la notificación con animación
  setTimeout(() => {
    message.classList.add("show")
  }, 10)

  // Remover la notificación después de 2 segundos
  setTimeout(() => {
    message.classList.remove("show")
    setTimeout(() => {
      message.remove()
    }, 300)
  }, 2000)
}

function updateCartDisplay() {
  const container = document.getElementById("cart-items-container")
  const emptyMessage = document.getElementById("empty-cart-message")
  const extrasSection = document.getElementById("extras-section")

  // Si el carrito está vacío, mostrar mensaje y ocultar contenedor de items
  if (cart.items.length === 0) {
    emptyMessage.style.display = "block"
    container.style.display = "none"
    extrasSection.style.display = "none" // Ocultar extras si carrito vacío
    container.innerHTML = ""
  } else {
    // Si hay items, ocultar mensaje vacío y mostrar los productos
    emptyMessage.style.display = "none"
    container.style.display = "block"
    extrasSection.style.display = "block" // Mostrar extras si hay productos

    container.innerHTML = cart.items
      .map(
        (item, index) => `
      <div class="cart-item-large">
        <div class="cart-item-image">
          <img src="${item.imageSrc}" alt="${item.name}"> 
        </div>
        <h3>${item.name}</h3>
        <p class="item-quantity">Cantidad: ${item.quantity}</p>
        <p class="price">${(item.price * item.quantity).toLocaleString("es-CO")}$</p>
        <button class="btn-remove" onclick="removeFromCart(${index})">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2h4a2 2 0 0 1 2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Eliminar
        </button>
      </div>
    `,
      )
      .join("")
  }
}

function removeFromCart(index) {
  const item = cart.items[index]
  cart.total -= item.price * item.quantity
  cart.items.splice(index, 1)
  updateCartDisplay()
}

function updateExtraQuantity(extraKey, change) {
  const extra = extras[extraKey]
  const newQuantity = extra.quantity + change

  if (newQuantity >= 0 && newQuantity <= 99) {
    extra.quantity = newQuantity
    document.getElementById(`${extraKey}-qty`).textContent = newQuantity
  }
}

function proceedToSummary() {
  if (cart.items.length === 0) {
    alert("No has agregado ningún producto al carrito. Por favor agrega al menos un producto antes de continuar.")
    return
  }

  // Agregar extras al carrito
  Object.keys(extras).forEach((key) => {
    const extra = extras[key]
    if (extra.quantity > 0) {
      const existingItemIndex = cart.items.findIndex((item) => item.name === extra.name)

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += extra.quantity
        cart.total += extra.price * extra.quantity
      } else {
        cart.items.push({
          name: extra.name,
          price: extra.price,
          quantity: extra.quantity,
        })
        cart.total += extra.price * extra.quantity
      }

      // Resetear cantidad después de agregar
      extra.quantity = 0
      document.getElementById(`${key}-qty`).textContent = "0"
    }
  })

  updateSummaryDisplay()
  navigateTo("summary-screen")
}

function updateSummaryDisplay() {
  const summaryContainer = document.getElementById("summary-items-container")
  const summaryTotalElement = document.getElementById("summary-total-price")

  // Mostrar todos los items del carrito con sus cantidades
  summaryContainer.innerHTML = cart.items
    .map(
      (item) => `
    <div class="summary-item">
      <div class="summary-item-image">
       <img src="${item.imageSrc}" alt="${item.name}">
      </div>
      <h3>${item.name}</h3>
      <p class="item-quantity">Cantidad: ${item.quantity}</p>
      <p class="price">${(item.price * item.quantity).toLocaleString("es-CO")}$</p>
    </div>
  `,
    )
    .join("")

  // Mostrar el total correcto
  summaryTotalElement.textContent = cart.total.toLocaleString("es-CO") + "$"
}

function addToCart(name, price) {
  cart.items.push({ name, price })
  cart.total += price
  console.log("[v0] Added to cart:", name, price)
  navigateTo("cart-screen")
}

function addExtra(name, price) {
  cart.items.push({ name, price })
  cart.total += price
  alert(`${name} agregado al carrito`)
}

// Sidebar toggle (placeholder)
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  sidebar.classList.toggle("active")
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar")
  sidebar.classList.remove("active")
}

function filterByCategory(category) {
  const products = document.querySelectorAll(".product-card")

  products.forEach((product) => {
    if (category === "todo") {
      product.style.display = "block"
    } else {
      const productCategory = product.getAttribute("data-category")
      if (productCategory === category) {
        product.style.display = "block"
      } else {
        product.style.display = "none"
      }
    }
  })

  closeSidebar()
  console.log("[v0] Filtered by category:", category)
}

function searchProducts() {
  const searchInput = document.getElementById("search-input").value.toLowerCase().trim()
  const products = document.querySelectorAll(".product-card")
  let foundCount = 0

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase()

    // Si el campo de búsqueda está vacío, mostrar todos
    if (searchInput === "") {
      product.style.display = "block"
      foundCount++
    } else if (productName.includes(searchInput)) {
      // Si coincide con la búsqueda, mostrar
      product.style.display = "block"
      foundCount++
    } else {
      // Si no coincide, ocultar
      product.style.display = "none"
    }
  })

  // Log para debug
  console.log(`[v0] Search: "${searchInput}" - Found ${foundCount} products`)
}

// Logout functionality
function logout() {
  // Limpiar el carrito
  cart.items = []
  cart.total = 0

  // Resetear extras
  Object.keys(extras).forEach((key) => {
    extras[key].quantity = 0
    document.getElementById(`${key}-qty`).textContent = "0"
  })

  // Resetear producto actual
  currentProduct = null
  currentProductQuantity = 1

  // Navegar a la pantalla de login
  navigateTo("auth-screen")
}

function updateInvoiceDisplay() {
  const invoiceItemsContainer = document.getElementById("invoice-items-container")
  const invoiceTotalElement = document.getElementById("invoice-total-price")

  // Mostrar todos los items del carrito en la factura
  invoiceItemsContainer.innerHTML = cart.items
    .map(
      (item) => `
      <p>${item.name} ${item.quantity > 1 ? `x${item.quantity}` : ""}</p>
    `,
    )
    .join("")

  // Mostrar el total correcto
  invoiceTotalElement.textContent = cart.total.toLocaleString("es-CO") + "$"
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Coffee Shop app initialized")
  updateCartDisplay()
})





