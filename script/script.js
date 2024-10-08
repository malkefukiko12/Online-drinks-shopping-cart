let cartCount = 0;
let cartTotal = 0;
const cartItems = {};
const SHIPPING_FEE = 50;
const DISCOUNT_THRESHOLD = 500;
const DISCOUNT_RATE = 0.05;

function addToCart(item, price, qtyId) {
    const quantity = parseInt(document.getElementById(qtyId).value);

    // Update cart count and total price
    cartCount += quantity;
    cartTotal += price * quantity;

    // Update cart items
    if (cartItems[item]) {
        cartItems[item].quantity += quantity;
    } else {
        cartItems[item] = { price: price, quantity: quantity };
    }

    // Update ang display
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);

    // Update cart details list
    updateCartDetails();

    alert(`${quantity} x ${item} added to cart at ₱${price} each.`);
}

function updateCartDetails() {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = ''; 

    for (let item in cartItems) {
        const listItem = document.createElement('li');
        listItem.textContent = `${cartItems[item].quantity} x ${item} @ ₱${cartItems[item].price.toFixed(2)} each`;

        const itemTotalPrice = document.createElement('span');
        itemTotalPrice.textContent = ` ₱${(cartItems[item].price * cartItems[item].quantity).toFixed(2)}`;
        listItem.appendChild(itemTotalPrice);

        cartItemsList.appendChild(listItem);
    }

    // Update ang total sa cart details section
    document.getElementById('cart-total-list').textContent = cartTotal.toFixed(2);
}

function calculateTotalWithDiscountAndShipping(cartTotal) {
    let discount = 0;
    if (cartTotal > DISCOUNT_THRESHOLD) {
        discount = cartTotal * DISCOUNT_RATE;
    }
    return cartTotal + SHIPPING_FEE - discount;
}

function placeOrder() {
    if (cartCount === 0) {
        alert('Your cart is empty.');
        return;
    }

    const finalTotal = calculateTotalWithDiscountAndShipping(cartTotal);
    let orderSummary = 'Order Summary:\n\n';
    for (let item in cartItems) {
        orderSummary += `${cartItems[item].quantity} x ${item} @ ₱${cartItems[item].price.toFixed(2)} each\n`;
    }
    orderSummary += `\nCart Total: ₱${cartTotal.toFixed(2)}`;
    orderSummary += `\nShipping Fee: ₱${SHIPPING_FEE}`;
    if (cartTotal > DISCOUNT_THRESHOLD) {
        const discount = cartTotal * DISCOUNT_RATE;
        orderSummary += `\nDiscount: -₱${discount.toFixed(2)}`;
    }
    orderSummary += `\nFinal Total: ₱${finalTotal.toFixed(2)}`;
orderSummary += `\n\nTHANK YOU FOR SHOPPING!!`;
    alert(orderSummary);

    // Reset ang cart
    cartCount = 0;
    cartTotal = 0;
    for (let item in cartItems) {
        delete cartItems[item];
    }

    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
    updateCartDetails();
}