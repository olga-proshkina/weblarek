import "./scss/styles.scss";
import { MainCatalog } from "./components/Models/MainCatalog.ts";
import { Cart } from "./components/Models/Cart.ts";
import { Buyer } from "./components/Models/Buyer.ts";
import { WebLarekApi } from "./components/Models/WebLarekApi.ts";
import { API_URL } from "./utils/constants.js";
import { Api } from "./components/base/Api.js";
import { Header } from "./components/View/Header.ts";
import { Gallery } from "./components/View/Gallery.ts";
import { cloneTemplate, ensureElement } from "./utils/utils.ts";
import {
  ProductGalleryView,
  ProductPreview,
  ProductCartView,
} from "./components/View/Products.ts";
import { EventEmitter } from "./components/base/Events.ts";
import { ModalWindow } from "./components/View/ModalWindow.ts";
import { IProduct, PostOrderData } from "./types/index.ts";
import { CartView } from "./components/View/Cart.ts";
import { OrderForm, ContactsForm } from "./components/View/Order.ts";
import { SuccessModal } from "./components/View/Success.ts";

// инициализация API и системы событий
const events = new EventEmitter();
const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);

// инициализация моделей данных
const catalogModel = new MainCatalog(events);
const cartModel = new Cart(events);
const buyerModel = new Buyer(events);

const page = ensureElement<HTMLElement>(".page");
const gallery = new Gallery(page);

//создаем компоненты слоя представления
//создаем карточку подробного описания товара
const previewView = new ProductPreview(events, cloneTemplate("#card-preview"));

// создаем модальное окно
const modalView = new ModalWindow(
  events,
  ensureElement("#modal-container", page),
);

//создаем корзину
const cartView = new CartView(events, cloneTemplate("#basket"));

//создаем header
const headerView = new Header(events, ensureElement(".header", page));

//создаем форму заказа
const orderView = new OrderForm(events, cloneTemplate("#order"));

//создаем contacts
const contactsView = new ContactsForm(events, cloneTemplate("#contacts"));

//создаем successView
const successView = new SuccessModal(events, cloneTemplate("#success"));

//получаем данные о товарах с сервера
async function fetchProducts(): Promise<IProduct[] | undefined> {
  try {
    const response = await webLarekApi.getProducts();
    if (response) {
      return response.items;
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных о товарах:", error);
    return [] as IProduct[];
  }
}

fetchProducts()
  .then((products) => {
    catalogModel.setProducts(products ?? [] as IProduct[]);
  })
  .catch((error) => {
    console.error("Ошибка при загрузке данных о товарах:", error);
    catalogModel.setProducts([] as IProduct[]);
  });

//создаем карточки товаров
events.on("catalog changed", () => {
  gallery.content = catalogModel.getProducts().map((item) => {
    const container = cloneTemplate("#card-catalog");
    const productGalleryView = new ProductGalleryView(container, {
      onClick: () => {
        catalogModel.setSelectedProduct(item);
        events.emit("product:open", item);
      },
    });
    productGalleryView.imageLink = item.image;
    return productGalleryView.render(item);
  });
});

//отрисовываем карточку подробного описания товара
events.on("selected product changed", () => {
  const selected = catalogModel.getSelectedProduct();
  if (selected.price === null) {
    previewView.disableButton = true;
    previewView.button = "Недоступно";
  } else if (cartModel.checkCart(selected)) {
    previewView.disableButton = false;
    previewView.button = "Удалить из корзины";
  } else if (!cartModel.checkCart(selected)) {
    previewView.disableButton = false;
    previewView.button = "В корзину";
  }
  previewView.render(selected);
});

events.on("product:open", () => {
  const selected = catalogModel.getSelectedProduct();
  modalView.show();
  modalView.content = previewView.render(selected);
  previewView.imageLink = selected.image;
});

events.on("cart button click", () => {
  const selected = catalogModel.getSelectedProduct();
  if (cartModel.checkCart(selected)) {
    cartModel.removeFromCart(selected);
  } else cartModel.addToCart(selected);
  modalView.close();
});

events.on("cart content change", () => {
  //перерисовыаем счетчик корзины в шапке
  const cartQuantity: number = cartModel.getQuantity();
  if (cartQuantity > 0) {
    cartView.disableButton = false;
  } else {
    cartView.disableButton = true;
  }
  headerView.counter = cartQuantity;

  //перерисовываем содержимое корзины
  cartView.products = cartModel.getProductsFromCart().map((product, index) => {
    const productCartView = new ProductCartView(cloneTemplate("#card-basket"), {
      onClick: () => {
        events.emit("cart: remove product", product);
      },
    });
    productCartView.index = index + 1;
    return productCartView.render(product);
  });

  //перерисовываем общую стоимость товаров в корзине
  const totalPrice = cartModel.calculateTotalPrice();
  cartView.totalPrice = totalPrice;
});

events.on("cart:open", () => {
  modalView.show();
  modalView.content = cartView.render();
});

events.on("cart: remove product", (product: IProduct) => {
  cartModel.removeFromCart(product);
});

events.on("cart: order", () => {
  modalView.content = orderView.render();
});

events.on("payment:card", () => {
  buyerModel.setPayment("card");
});

events.on("payment:cash", () => {
  buyerModel.setPayment("cash");
});

events.on("email: changed", (text: { email: string }) => {
  buyerModel.setEmail(text.email);
});

events.on("address: changed", (text: { address: string }) => {
  buyerModel.setAddress(text.address);
});

events.on("buyer data change", () => {
  const buyerData = buyerModel.getData();
  orderView.address = buyerData.address;
  orderView.payment = buyerData.payment!;
  contactsView.email = buyerData.email;
  contactsView.phone = buyerData.phone;

  orderView.formErrors = [
    buyerModel.validatePayment().validationMessage,
    buyerModel.validateAddress().validationMessage,
  ];
  if (
    !buyerModel.validatePayment().validationMessage &&
    !buyerModel.validateAddress().validationMessage
  ) {
    orderView.disableButton = false;
  } else {
    orderView.disableButton = true;
  }
  contactsView.formErrors = [
    buyerModel.validateEmail().validationMessage,
    buyerModel.validatePhone().validationMessage,
  ];
  if (
    !buyerModel.validateEmail().validationMessage &&
    !buyerModel.validatePhone().validationMessage
  ) {
    contactsView.disableButton = false;
  } else {
    contactsView.disableButton = true;
  }
});

events.on("phone: changed", (text: { phone: string }) => {
  buyerModel.setPhone(text.phone);
});

events.on("order:submit", () => {
  modalView.content = contactsView.render();
});

events.on("contacts:submit", () => {
  const buyerData = buyerModel.getData();
  const POSTData: PostOrderData = {
    email: buyerData.email,
    phone: buyerData.phone,
    address: buyerData.address,
    payment: buyerData.payment!,
    total: cartModel.calculateTotalPrice(),
    items: cartModel.getProductsFromCart().map((item) => item.id),
  };
  successView.totalPrice = cartModel.calculateTotalPrice();
  modalView.content = successView.render();
  webLarekApi.postOrder(POSTData).catch((error) => {
    console.error("Ошибка при отправке данных заказа:", error);
  });
  cartModel.clearCart();
  buyerModel.clearData();
});
