import './scss/styles.scss';
import { apiProducts } from '../src/utils/data.ts';
import { MainCatalog } from './components/base/Models/MainCatalog.ts';
import { Cart } from './components/base/Models/Cart.ts';
import { Buyer } from './components/base/Models/Buyer.ts';
import { Api } from './components/base/Models/Api.ts';
import { API_URL } from '../src/utils/constants.ts';


console.log(apiProducts);

//тестирование класса MainCatalog
const productsModel  = new MainCatalog(apiProducts.items, apiProducts.items[0]);
productsModel.setProducts(apiProducts.items); 
let products = productsModel.getProducts(); 
let selectedProduct = productsModel.getSelectedProduct();
console.log(products);
console.log(selectedProduct);

//тестирование класса Cart
const testCart = new Cart(apiProducts.items);
testCart.addToCart(selectedProduct);
console.log(testCart);
testCart.removeFromCart(selectedProduct);
console.log(testCart);
const quantity = testCart.getQuantity();
console.log(quantity);
const productsInCart = testCart.getProductsFromCart();
console.log(productsInCart);
const total = testCart.calculateTotalPrice();
console.log(total);
const checkItem = testCart.checkCart(selectedProduct);
console.log(checkItem);

//тестирование класса Buyer
const testBuyer = new Buyer('card', 'Moscow', 'arch@true.com', '+73456789')
let testData = testBuyer.getData();

console.log(testData);

testBuyer.clearData();
console.log(testBuyer);

let isPaymentValid = testBuyer.validatePayment();
console.log(isPaymentValid);

let isAddressValid = testBuyer.validateAddress();
console.log(isAddressValid);

let isEmailValid = testBuyer.validateEmail();
console.log(isEmailValid);

let isPhoneValid = testBuyer.validatePhone();
console.log(isPhoneValid);

testBuyer.setData('card', 'Moscow', 'arch@true.com', '+73456789')
testData = testBuyer.getData();

console.log(testData);

isPaymentValid = testBuyer.validatePayment();
console.log(isPaymentValid);

isAddressValid = testBuyer.validateAddress();
console.log(isAddressValid);

isEmailValid = testBuyer.validateEmail();
console.log(isEmailValid);

isPhoneValid = testBuyer.validatePhone();
console.log(isPhoneValid);

//тестирование класса Api
const api = new Api(API_URL);
let testGetApi = await api.getData();
console.log(testGetApi.items);

let serverTestData = testGetApi.items;
productsModel.setProducts(serverTestData); 
products = productsModel.getProducts(); 
console.log(products);

const apiPostData = {
    payment: 'online',
    email: 'any email',
    phone: '+1236789',
    address: 'Milan',
    total: 2200,
    items: ["854cef69-976d-4c2a-a18c-2aa45046c390",
            "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"]
}

let testPostApi = await api.postData(apiPostData);
console.log(testPostApi);
