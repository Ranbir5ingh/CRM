export abstract class PaymentGateway {
  abstract processPayment(): void;
}

export class CreditCardPayment implements PaymentGateway {
  processPayment(): void {
    console.log('Processing credit card payment');
  }
}
export class UpiPayment implements PaymentGateway {
  processPayment(): void {
    console.log('Processing credit card payment');
  }
}

export enum PAYMENT_METHOD {
  CREDIT_CARD = 'CREDIT_CARD',
  UPI = 'UPI',
}
