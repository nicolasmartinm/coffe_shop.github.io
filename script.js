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
    imageSrc: "/combo-desayuno.jpg",
  },
  Empanadas: {
    price: 3500,
    description: "Empanadas crujientes rellenas de carne o pollo. Preparadas al momento con ingredientes frescos.",
    category: "snacks",
    imageSrc: "/empanadas.jpg",
  },
  Croissant: {
    price: 4500,
    description: "Croissant de mantequilla recién horneado, suave por dentro y crujiente por fuera.",
    category: "snacks",
    imageSrc: "/croissant.jpg",
  },
  "Sandwich Club": {
    price: 8500,
    description: "Sandwich triple con jamón, queso, tomate, lechuga y mayonesa. Acompañado de papas criollas.",
    category: "snacks",
    imageSrc: "/sandwich-club.jpg",
  },
  "Tostadas Francesas": {
    price: 7000,
    description: "Tostadas francesas con miel de maple, frutas frescas y crema batida.",
    category: "snacks",
    imageSrc: "/tostadas-francesas.jpg",
  },
  Gaseosa: {
    price: 2500,
    description: "Gaseosa fría en presentación de 350ml. Variedad de sabores disponibles.",
    category: "bebidas",
    imageSrc: "/gaseosa.jpg",
  },
  "Jugo Natural": {
    price: 5000,
    description: "Jugo natural preparado con frutas frescas. Sin azúcar añadida ni conservantes.",
    category: "bebidas",
    imageSrc: "/jugo-natural.jpg",
  },
  Limonada: {
    price: 4000,
    description: "Limonada natural con hielo picado y menta fresca. Perfecta para refrescarte.",
    category: "bebidas",
    imageSrc: "/limonada.jpg",
  },
  "Smoothie de Frutas": {
    price: 6500,
    description: "Batido cremoso de frutas mixtas con yogurt. Rico en vitaminas y delicioso.",
    category: "bebidas",
    imageSrc: "/smoothie-de-frutas.jpg",
  },
  Helados: {
    price: 3500,
    description: "Helado artesanal en variedad de sabores. Cremoso y refrescante.",
    category: "postres",
    imageSrc: "/helados.jpg",
  },
  "Torta de Chocolate": {
    price: 5500,
    description: "Porción de torta de chocolate con cobertura de ganache. Intenso sabor a cacao.",
    category: "postres",
    imageSrc: "/torta-de-chocolate.jpg",
  },
  Cheesecake: {
    price: 6000,
    description: "Cheesecake cremoso sobre base de galleta. Con salsa de frutos rojos.",
    category: "postres",
    imageSrc: "/cheesecake.jpg",
  },
  Brownie: {
    price: 4500,
    description: "Brownie de chocolate servido tibio. Crujiente por fuera, suave por dentro.",
    category: "postres",
    imageSrc: "/brownie.jpg",
  },
  "Café Americano": {
    price: 3000,
    description: "Café americano preparado con granos 100% colombianos. Suave y aromático.",
    category: "cafes",
    imageSrc: "/cafe-americano.jpg",
  },
  Cappuccino: {
    price: 4000,
    description: "Cappuccino con espuma de leche perfecta. Balance ideal entre café y leche.",
    category: "cafes",
    imageSrc: "/cappuccino.jpg",
  },
  Latte: {
    price: 4500,
    description: "Latte suave con arte en la espuma. Preparado con leche fresca y espresso.",
    category: "cafes",
    imageSrc: "/latte.jpg",
  },
  Espresso: {
    price: 2500,
    description: "Espresso intenso y concentrado. Para los verdaderos amantes del café.",
    category: "cafes",
    imageSrc: "/espresso.jpg",
  },
  Mocha: {
    price: 5000,
    description: "Café mocha con chocolate y crema batida. Dulce y delicioso.",
    category: "cafes",
    imageSrc: "/mocha.jpg",
  },
  "Café Frío": {
    price: 5500,
    description: "Café frío con hielo y leche. Perfecto para días calurosos.",
    category: "cafes",
    imageSrc: "/cafe-frío.jpg",
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
          <img src="/placeholder.svg?height=150&width=150" alt="${item.name}">
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


