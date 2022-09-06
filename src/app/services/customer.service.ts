import { Injectable } from '@angular/core';
import { ICustomer } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  create(data: ICustomer): boolean {
    const customers: Array<ICustomer> = this.getStorage();
    const index = customers.findIndex(a => a.Firstname == data.Firstname || a.Lastname == data.Lastname || a.DateOfBirth == data.DateOfBirth)
    if (index == -1) {
      customers.push(data);
      this.setToStorage(customers);
      return true;
    }
    return false;
  }


  edit(data: ICustomer, Firstname: string): boolean {
    const customers: Array<ICustomer> = this.getStorage();
    const index = customers.findIndex(a => a.Firstname == Firstname);
    if (index > -1) {
      customers[index] = { ...data };
      this.setToStorage(customers);
      return true;
    }
    return false

  }

  remove(index: number) {
    const customers: Array<ICustomer> = this.getStorage();
    customers.splice(index, 1);
    this.setToStorage(customers);
  }

  getStorage(): Array<ICustomer> {
    let storage = localStorage.getItem('customers');
    let customers: Array<ICustomer> = [];
    if (storage) {
      customers = JSON.parse(storage);
    }
    return customers;
  }

  setToStorage(data: Array<ICustomer>): void {
    const customers = JSON.stringify(data);
    localStorage.setItem('customers', customers)
  }


}
