import "./scss/styles.scss";
import { apiProducts } from "../src/utils/data.ts";
import { MainCatalog } from "./components/Models/MainCatalog.ts";
import { Cart } from "./components/Models/Cart.ts";
import { Buyer } from "./components/Models/Buyer.ts";
import { WebLarekApi } from "./components/Models/WebLarekApi.ts";
import { API_URL } from "./utils/constants.js";
import { Api } from "./components/base/Api.js";
import { Header } from "./components/View/Header.ts";
import { Gallery } from "./components/View/Gallery.ts";
import { ensureElement } from "./utils/utils.ts";
import { ProductGalleryView } from "./components/View/Products.ts";

// console.log(apiProducts);

// //тестирование класса MainCatalog
// const productsModel = new MainCatalog(apiProducts.items, apiProducts.items[0]);
// productsModel.setProducts(apiProducts.items);
// let products = productsModel.getProducts();
// let selectedProduct = productsModel.getSelectedProduct();
// console.log(products);
// console.log(selectedProduct);

// //тестирование класса Cart
// const testCart = new Cart(apiProducts.items);
// testCart.addToCart(selectedProduct);
// console.log(testCart);
// testCart.removeFromCart(selectedProduct);
// console.log(testCart);
// const quantity = testCart.getQuantity();
// console.log(quantity);
// const productsInCart = testCart.getProductsFromCart();
// console.log(productsInCart);
// const total = testCart.calculateTotalPrice();
// console.log(total);
// const checkItem = testCart.checkCart(selectedProduct);
// console.log(checkItem);

// //тестирование класса Buyer
// const testBuyer = new Buyer();

// testBuyer.setPayment("card");
// testBuyer.setAddress("Moscow");
// testBuyer.setEmail("arch@true.com");
// testBuyer.setPhone("+73456789");

// const testData = testBuyer.getData();

// console.log(testData);

// //тестирование валидации данных
// const isPaymentValid = testBuyer.validatePayment();
// console.log(isPaymentValid);

// const isAddressValid = testBuyer.validateAddress();
// console.log(isAddressValid);

// const isEmailValid = testBuyer.validateEmail();
// console.log(isEmailValid);

// const isPhoneValid = testBuyer.validatePhone();
// console.log(isPhoneValid);

// //тестирование валидации пустых данных
// testBuyer.clearData();
// const testEmptyData = testBuyer.getData();

// console.log(testEmptyData);

// const isEmptyPaymentValid = testBuyer.validatePayment();
// console.log(isEmptyPaymentValid);

// const isEmptyAddressValid = testBuyer.validateAddress();
// console.log(isEmptyAddressValid);

// const isEmptyEmailValid = testBuyer.validateEmail();
// console.log(isEmptyEmailValid);

// const isEmptyPhoneValid = testBuyer.validatePhone();
// console.log(isEmptyPhoneValid);

//тестирование класса Api
// const apiPostData = {
//   payment: "online",
//   email: "any email",
//   phone: "+1236789",
//   address: "Milan",
//   total: 2200,
//   items: [
//     "854cef69-976d-4c2a-a18c-2aa45046c390",
//     "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
//   ],
// };

// const apiForWebLarek = new Api(API_URL, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// const api = new WebLarekApi(apiForWebLarek);
// const testGetApi = await api.getProducts();
// console.log(testGetApi.items);

// const serverTestData = testGetApi.items;
// productsModel.setProducts(serverTestData);
// products = productsModel.getProducts();
// console.log(products);

// const testPostApi = await api.postOrder(apiPostData);
// console.log(testPostApi);


// const apiForWebLarek = new Api(API_URL, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const api = new WebLarekApi(apiForWebLarek);
// const galleryContent = await api.getProducts();
// console.log(galleryContent.items);
// const mainCatalogData = new MainCatalog(galleryContent.items, galleryContent.items[0])
// const productsGalleryViewContainer = document
// const productsGalleryView = new ProductGalleryView(events, )

// const galleryContainer: HTMLElement | null = ensureElement('.gallery');
// if (galleryContainer) {
//     const gallery = new Gallery(galleryContainer);
//     document.addEventListener('DOMContentLoaded', () => {
    
// })

// }