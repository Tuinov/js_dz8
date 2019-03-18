let cart = [];
var products = [
               {
                   name: 'bag',
                   color: 'green',
                   cost: 150,
                   cover: "img/layer1.jpg"
               },
                {
                   name: 'pump',
                   color: 'white', 
                   cost: 555,
                   cover: "img/layer2.jpg" 
               },
                {
                   name: 'jacket',
                   color: 'blue',  
                   cost: 259,
                   cover: "img/layer3.jpg" 
               },
                {
                   name: 'parkа',
                   color: 'green',
                   cost: 150,
                   cover: "img/layer4.jpg"
               },
                {
                   name: 'coat',
                   color: 'white', 
                   cost: 555,
                   cover: "img/layer5.jpg" 
               },
                {
                   name: 'blazer',
                   color: 'blue',  
                   cost: 259,
                   cover: "img/layer6.jpg" 
               },
                {
                   name: 'furs',
                   color: 'green',
                   cost: 150,
                   cover: "img/layer7.jpg"
               },
                {
                   name: 'shirt',
                   color: 'white', 
                   cost: 555,
                   cover: "img/layer8.jpg" 
               },
               
           ];

const $productsWrap = document.getElementById('productsWrap');

// создаёт разметку для каждого товара
let renderItem = ({cover, name, cost}) => {
    return `<div class="product">
              <img class="image" src=${cover}>
              <p class="name">${name.toUpperCase()}</p>
              <br>
              <span class="cost">${cost}</span><br>
              <button>КУПИТЬ</button>
            </div>`;
}

// добавляет разметку для всех товаров в HTML
let buildCatalog = (products) => {
    const itemsHtml = products.map(renderItem);
    $productsWrap.innerHTML = itemsHtml.join('');
}

buildCatalog(products);

// проверяет наличие товара в корзине.
function getIndex(name) {
    let idx = -1;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) idx = i;
    }
    return idx;
}

// слушает кнопку, складывет товары в корзину
$productsWrap.addEventListener('click', function(event) {
    if (event.target.tagName == 'BUTTON') {
        $product = event.target.parentElement;
        let name = $product.querySelector('.name').textContent;
        let cost = +$product.querySelector('.cost').textContent;
        let cover = $product.querySelector('.image').src;
        let index = getIndex(name);
        if (index === -1) {
            // товара в корзине нет  
            cart.push({
                name: name, 
                cost: cost, 
                quantity: 1, 
                cover: cover
            });
        } else {
            cart[index].quantity++;
        }
        buildCart(cart);
    }
});


let $cart = document.getElementById('cart')

function buildCart(cart) {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        sum = sum + cart[i].cost * cart[i].quantity;
        count = count + cart[i].quantity;
    }
    let $span = document.createElement('span');
    if (cart.length === 0) {
        $span.textContent = 'Ваша корзина пуста ';
    } else {
        buildTotal(cart);
    }
    $cart.appendChild($span);
}
var $tmplCartItem = document.getElementById('tmplCartItem');

function buildTotal(cart) {
    $cart.innerHTML = '';
    for (let i = 0; i < cart.length; i++) {
        let $items = $tmplCartItem.children[0].cloneNode(true);
        $items.querySelector('.name').textContent = cart[i].name;
        $items.querySelector('.cost').textContent = cart[i].cost;
        $items.querySelector('.imageCart').src = cart[i].cover;
        $items.querySelector('.quantity').textContent = cart[i].quantity;
        $cart.appendChild($items);
    }
}
$cart.addEventListener('click', function() {
    if (event.target.tagname = 'BUTTON') {
        let $product = event.target.parentElement;
        let name = $product.querySelector('.name').textContent;
        let index = getIndex(name);
        let product = cart[index];
        if (product.quantity > 1) {
            cart[index].quantity--;
        }
        else {
            cart.splice(index, 1);
        }
        buildTotal(cart);
    }
});

