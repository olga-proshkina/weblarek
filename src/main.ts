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
import { cloneTemplate, ensureElement } from "./utils/utils.ts";
import { ProductGalleryView, ProductPreview, ProductCartView } from "./components/View/Products.ts";
import { EventEmitter } from "./components/base/Events.ts";
import { ModalWindow } from "./components/View/ModalWindow.ts";
import { IBuyer, IProduct, PostOrderData } from "./types/index.ts";
import { CartView } from "./components/View/Cart.ts";
import { OrderForm, ContactsForm } from "./components/View/Order.ts";
import { SuccessModal } from './components/View/Success.ts'

// инициализация API и системы событий
const events = new EventEmitter();
const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);

// инициализация моделей данных
const catalogModel = new MainCatalog(events);
const cartModel = new Cart(events);
const buyerModel = new Buyer(events);

const page = ensureElement<HTMLElement>('.page');
const gallery = new Gallery(page);

//получаем данные о товарах с сервера
const products = await webLarekApi.getProducts();
const productsData = products.items;

//создаем карточки товаров 
events.on('catalog changed', () => {
    gallery.content = productsData.map((item) => {
        const container = cloneTemplate('#card-catalog');
        const productGalleryView = new ProductGalleryView(container, {
            onClick: () => {
                catalogModel.setSelectedProduct(item);
                events.emit('product:open', item);
            }});
        switch (item.category) {
            case 'софт-скил':
                productGalleryView.productCategory.classList.add('card__category_soft');
                break;
            case 'хард-скил':
                productGalleryView.productCategory.classList.add('card__category_hard');
                break;
            case 'кнопка':
                productGalleryView.productCategory.classList.add('card__category_button');
                break;
            case 'дополнительное':
                productGalleryView.productCategory.classList.add('card__category_additional');
                break;
            case 'другое':
                productGalleryView.productCategory.classList.add('card__category_other');
                break;
        }
        productGalleryView.imageLink = item.image;
        return productGalleryView.render(item);
    });
});

catalogModel.setProducts(productsData);

//создаем карточку подробного описания товара 
const previewContainer = cloneTemplate('#card-preview');
const previewView = new ProductPreview(events, previewContainer);

//отрисовываем карточку подробного описания товара
events.on('selected product changed', () => {
    const selected = catalogModel.getSelectedProduct();
     if (selected.price === null) {
        previewView.deactivateButton();
        previewView.button = 'Недоступно';
    } else if (cartModel.checkCart(selected)) {
        previewView.activateButton();
        previewView.button = 'Удалить из корзины';
    } else if (!cartModel.checkCart(selected)) {
        previewView.activateButton();
        previewView.button = 'В корзину';
    }
    previewView.render(selected);
});

// создаем модальное окно
const containerModal = ensureElement('#modal-container', page);
const modalView = new ModalWindow(events, containerModal);

events.on('product:open', () => {
    const selected = catalogModel.getSelectedProduct();
    modalView.show();
    modalView.content = previewView.render(selected);
      });

events.on('modal:close', () => {
    modalView.close();
})

//создаем корзину
const cartContainer = cloneTemplate('#basket');
const cartView = new CartView(events, cartContainer);


events.on('cart: add / remove', () => {
    const selected = catalogModel.getSelectedProduct();
    if (cartModel.checkCart(selected)) { 
        cartModel.removeFromCart(selected);
    }
    else cartModel.addToCart(selected);
    modalView.close();
})

//создаем header
const headerContainer = ensureElement('.header', page);
const headerView = new Header(events, headerContainer);

events.on('cart content change', () => {
    //перерисовыаем счетчик корзины в шапке
    const cartQuantity: number = cartModel.getQuantity();
    console.log(cartQuantity);
    if (cartQuantity > 0) {
        cartView.activateButton();
    } else {
        cartView.deactivateButton();
    }
    headerView.counter = cartQuantity;

    //перерисовываем содержимое корзины 
    let index: number = 0;
    cartView.products = cartModel.getProductsFromCart().map((product) => {
        const productCartView = new ProductCartView(cloneTemplate('#card-basket'), {
            onClick: () => {
            events.emit('cart: remove product', product);
            }});
            index++;
        productCartView.index = index;
        return productCartView.render(product);
    });

    //перерисовываем общую стоимость товаров в корзине
    const totalPrice = cartModel.calculateTotalPrice();
    cartView.totalPrice = totalPrice;
}) 

events.on('cart:open', () => {
    modalView.show();
    modalView.content = cartView.render();
});

events.on('cart: remove product', (product: IProduct) => {
    cartModel.removeFromCart(product);
});

//создаем order 
const orderView = new OrderForm(events, cloneTemplate('#order'));

events.on('cart: order', () => {
    modalView.content = orderView.render();
})

events.on('payment:card', () => {
    buyerModel.setPayment('card'); 
    orderView.paymentCardButton.classList.add('button_alt-active');
    orderView.paymentsCashButton.classList.remove('button_alt-active');
})

events.on('payment:cash', () => {
    buyerModel.setPayment('cash'); 
    orderView.paymentCardButton.classList.remove('button_alt-active');
    orderView.paymentsCashButton.classList.add('button_alt-active');
})

events.on('address: changed', (text: { address: string } ) => {
   buyerModel.setAddress(text.address);
})

events.on('order change', () => {
    orderView.formErrors = [buyerModel.validatePayment().validationMessage, buyerModel.validateAddress().validationMessage];
    if (!buyerModel.validatePayment().validationMessage && !buyerModel.validateAddress().validationMessage) {
        orderView.activateButton();
    } else {
        orderView.deactivateButton();
    }
})

events.on('contacts change', () => {
        contactsView.formErrors = [buyerModel.validateEmail().validationMessage, buyerModel.validatePhone().validationMessage];
        if (!buyerModel.validateEmail().validationMessage && !buyerModel.validatePhone().validationMessage) {
            contactsView.activateButton();
        } else {
            contactsView.deactivateButton();
    }
})

events.on('email: changed', (text: { email: string } ) => {
   buyerModel.setEmail(text.email);
});

events.on('phone: changed', (text: { phone: string } ) => {
   buyerModel.setPhone(text.phone);
})

//создаем contacts
const contactsView = new ContactsForm(events, cloneTemplate('#contacts'));

events.on('order:submit', () => {
    modalView.content = contactsView.render();
})

//создаем successView
const successView = new SuccessModal(events, cloneTemplate('#success'));

events.on('contacts:submit', () => {
    const buyerData = buyerModel.getData();
    const POSTData: PostOrderData = {
    email: buyerData.email,
    phone: buyerData.phone,
    address: buyerData.address,
    payment: buyerData.payment!,
    total: cartModel.calculateTotalPrice(),
    items: cartModel.getProductsFromCart().map(item => item.id)
  };
  successView.totalPrice = cartModel.calculateTotalPrice();
  modalView.content = successView.render();
  webLarekApi.postOrder(POSTData);
  cartModel.clearCart();
  buyerModel.clearData();
})