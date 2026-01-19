import "./scss/styles.scss";
import { apiProducts } from "../src/utils/data.ts";
import { MainCatalog } from "./components/Models/MainCatalog.ts";
import { Cart } from "./components/Models/Cart.ts";
import { Buyer } from "./components/Models/Buyer.ts";
import { WebLarekApi } from "./components/Models/WebLarekApi.ts";

console.log(apiProducts);

//тестирование класса MainCatalog
const productsModel = new MainCatalog(apiProducts.items, apiProducts.items[0]);
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
const testBuyer = new Buyer("1", "2", "3", "4");
const testData = testBuyer.getData();

console.log(testData);

const isPaymentValid = testBuyer.validatePayment();
console.log(isPaymentValid);

const isAddressValid = testBuyer.validateAddress();
console.log(isAddressValid);

const isEmailValid = testBuyer.validateEmail();
console.log(isEmailValid);

const isPhoneValid = testBuyer.validatePhone();
console.log(isPhoneValid);

testBuyer.setPayment("card");
testBuyer.setAddress("Moscow");
testBuyer.setEmail("arch@true.com");
testBuyer.setPhone("+73456789");

testBuyer.clearData();
const testEmptyData = testBuyer.getData();

console.log(testEmptyData);

const isEmptyPaymentValid = testBuyer.validatePayment();
console.log(isEmptyPaymentValid);

const isEmptyAddressValid = testBuyer.validateAddress();
console.log(isEmptyAddressValid);

const isEmptyEmailValid = testBuyer.validateEmail();
console.log(isEmptyEmailValid);

const isEmptyPhoneValid = testBuyer.validatePhone();
console.log(isEmptyPhoneValid);

//тестирование класса Api
const apiPostData = {
  payment: "online",
  email: "any email",
  phone: "+1236789",
  address: "Milan",
  total: 2200,
  items: [
    "854cef69-976d-4c2a-a18c-2aa45046c390",
    "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
  ],
};

const api = new WebLarekApi();
let testGetApi = await api.getProducts();
console.log(testGetApi.items);

let serverTestData = testGetApi.items;
productsModel.setProducts(serverTestData);
products = productsModel.getProducts();
console.log(products);

let testPostApi = await api.postOrder(apiPostData);
console.log(testPostApi);
