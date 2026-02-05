import { IBuyer, ValidationResult } from "../../types/index.js";
import { IEvents } from "../base/Events.js";

export class Buyer {
  protected payment: string | null;
  protected address: string;
  protected email: string;
  protected phone: string;
  

  constructor(protected events: IEvents) {
    this.payment = null;
    this.address = '';
    this.email = '';
    this.phone = '';
  }

  //метод getData позволяет получить данные покупателя
  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  // метод validatePayment проверяет заполнен ли способ оплаты
  validatePayment(): ValidationResult {
    const validationResult = { validationMessage: "" };
    if (!this.payment) {
      validationResult.validationMessage = "Не выбран вид оплаты";
    }
    return validationResult;
  }

  // validateAddress
  validateAddress(): ValidationResult {
    const validationResult = { validationMessage: "" };
    if (!this.address) {
      validationResult.validationMessage = "Укажите адрес";
    }
    return validationResult;
  }

  // метод validateEmail проверяет заполнено ли поле емайл
  validateEmail(): ValidationResult {
    const validationResult = { validationMessage: "" };
    if (!this.email) {
      validationResult.validationMessage = "Укажите email";
    }
    return validationResult;
  }

  // метод validatePhone проверяет заполнено ли поле номер телефон
  validatePhone(): ValidationResult {
    const validationResult = { validationMessage: "" };
    if (!this.phone) {
      validationResult.validationMessage = "Укажите номер телефона";
    }
    return validationResult;
  }

  //метод clearData удаляет данные покупателя
  clearData() {
    this.payment = null;
    this.address = "";
    this.email = "";
    this.phone = "";
    this.events.emit('buyer data change');
  }

  //методы setData сохраняют данные покупателя
  setPayment(payment: string | null) {
    this.payment = payment;
    this.events.emit('buyer data change');
  }

  setAddress(address: string) {
    this.address = address;
    this.events.emit('buyer data change');
  }

  setEmail(email: string) {
    this.email = email;
    this.events.emit('buyer data change');
  }

  setPhone(phone: string) {
    this.phone = phone;
    this.events.emit('buyer data change');
  }
}
