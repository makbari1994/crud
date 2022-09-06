import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/interfaces/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList: Array<ICustomer> = [];
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerList = this.customerService.getStorage();
    return this.customerList;
  }

  remove(index: number) {
    this.customerService.remove(index);
    this.getCustomers();

  }

}
