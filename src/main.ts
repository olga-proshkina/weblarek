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
import { ProductGalleryView } from "./components/View/Products.ts";
import { EventEmitter } from "./components/base/Events.ts";

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
    let productsHTML: HTMLElement[] = [];
    productsData.forEach(item => {
        const container = cloneTemplate('#card-catalog');
        const productGalleryView = new ProductGalleryView(events, container);
        productGalleryView.category = item.category;
        productGalleryView.imageLink = item.image;
        productGalleryView.imageDescription = item.title;
        if (typeof item.price === 'number') {
          productGalleryView.price = item.price;
        } else {
             productGalleryView.price = 0;
        }
        productGalleryView.title = item.title;
        productsHTML.push(productGalleryView.render(container));
        gallery.content = productsHTML;
    })
})

