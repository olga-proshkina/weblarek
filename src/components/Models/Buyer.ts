import { IBuyer, ValidationResult } from "../../types/index.js";

export class Buyer {
  protected payment: string | null;
  protected address: string;
  protected email: string;
  protected phone: string;

  constructor(
    payment: string | null,
    address: string,
    email: string,
    phone: string,
  ) {
    this.payment = payment;
    this.address = address;
    this.email = email;
    this.phone = phone;
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
  }

  //методы setData сохраняют данные покупателя
  setPayment(payment: string | null) {
    this.payment = payment;
  }

  setAddress(address: string) {
    this.address = address;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPhone(phone: string) {
    this.phone = phone;
  }
}
