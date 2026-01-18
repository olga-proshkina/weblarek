/*class Buyer

Payment method: card | cash | null
Address: string
Email: string
Phone number: string

---methods---

getData - получить данные заполненные пользователем
возвращает : IBuyer

validateData - проверяет данные и возвращает результат проверки
Принимает заполненные данные : IBuyer
Возвращает результат проверки 

clearData - удаляет данные покупателя

saveData - сохраняет данные покупателя
: IBuyer
*/

import { IBuyer } from '../../../types/index.js';

export class Buyer {

    protected payment: 'string' | null = null;
    protected address: string = '';
    protected email: string = '';
    protected  phone: string = '';

    constructor(payment: 'string' | null, address: string, email: string, phone: string) {
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
            phone: this.phone 
        };
    }

    // метод validatePayment проверяет заполнен ли способ оплаты
    validatePayment(): { isValid: boolean, validationMessage: string | null } {
        let validationResult = {isValid: true, validationMessage: ''};
        if (!this.payment) {
            validationResult.isValid = false;
            validationResult.validationMessage = 'Не выбран вид оплаты';
        }
        return validationResult;
    }

    // validateAddress
    validateAddress(): { isValid: boolean, validationMessage: string | null } {
        let validationResult = {isValid: true, validationMessage: ''};
        if (!this.address) {
            validationResult.isValid = false;
            validationResult.validationMessage = 'Укажите адрес';
        }
        return validationResult;
    }

    // метод validateEmail проверяет заполнено ли поле емайл
    validateEmail(): { isValid: boolean, validationMessage: string | null } {
        let validationResult = {isValid: true, validationMessage: ''};
        if (!this.email) {
            validationResult.isValid = false;
            validationResult.validationMessage = 'Укажите email';
        }
        return validationResult;
    }

    // метод validatePhone проверяет заполнено ли поле номер телефон
    validatePhone(): { isValid: boolean, validationMessage: string | null } {
        let validationResult = {isValid: true, validationMessage: ''};
        if (!this.phone) {
            validationResult.isValid = false;
            validationResult.validationMessage = 'Укажите номер телефона';
        }
        return validationResult;
    }

    //метод clearData удаляет данные покупателя
    clearData() {
        this.payment = null;
        this.address = '';
        this.email = '';
        this.phone = '';
    }

    //метод saveData сохраняет данные покупателя
    setData(payment: 'string' | null, address: string, email: string, phone: string) {
        this.payment = payment;
        this.address = address;
        this.email = email;
        this.phone = phone
    }
}