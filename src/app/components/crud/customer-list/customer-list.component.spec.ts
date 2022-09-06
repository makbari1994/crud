import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ICustomer } from 'src/app/interfaces/customer.interface';

import { CustomerListComponent } from './customer-list.component';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct length', () => {
    localStorage.clear();
    const customers: Array<ICustomer> = [
      {
        Firstname: 'mohamadreza',
        Lastname: 'akbari',
        DateOfBirth: '1373/04/08',
        PhoneNumber: '09191545510',
        Email: 'makbarics@gmail.com',
        BankAccountNumber: '585759654123'
      },
      {
        Firstname: 'ali',
        Lastname: 'akbaris',
        DateOfBirth: '1370/07/08',
        PhoneNumber: '0954879625',
        Email: 'akbarics@gmail.com',
        BankAccountNumber: '878978978944'
      }
    ]
    localStorage.setItem('customers', JSON.stringify(customers));
    component.getCustomers();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.item')).length).toBe(2);

  });

});
