import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ICustomer } from 'src/app/interfaces/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';

import { CreateEditComponent } from './create-edit.component';

describe('CreateEditComponent', () => {
  let component: CreateEditComponent;
  let fixture: ComponentFixture<CreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        CustomerService
      ],
      declarations: [CreateEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create customer', () => {

    const storage = localStorage.getItem('customers');
    if (storage) {
      const customers: Array<ICustomer> = JSON.parse(storage);
      const index = customers.findIndex(a => a.Firstname == 'mohamadreza');
      if (index > -1) {
        customers.splice(index, 1);
        localStorage.setItem('customers', JSON.stringify(customers));
      }

    }

    expect(component.form.valid).toBeFalsy();
    component.form.controls['Firstname'].setValue("mohamadreza");
    component.form.controls['Lastname'].setValue("akbari");
    component.form.controls['DateOfBirth'].setValue("1370/04/08");
    component.form.controls['PhoneNumber'].setValue("09191545510");
    component.form.controls['Email'].setValue("makbarics@gmail.com");
    component.form.controls['BankAccountNumber'].setValue("585759654123");
    // check to make sure form is valid
    expect(component.form.valid).toBeTruthy();


    // let customer: ICustomer = { ...component.form.value };

    // check to make sure create customer is correct
    const res: boolean = component.submit();
    expect(res).toBe(true);

  });


  it('should edit customer', () => {

    localStorage.clear();
    let data: ICustomer = {
      Firstname: 'mohamadreza',
      Lastname: 'akbari',
      DateOfBirth: '1373/04/08',
      PhoneNumber: '09191545510',
      Email: 'makbarics@gmail.com',
      BankAccountNumber: '585759654123'
    }
    const service = TestBed.inject(CustomerService);

    const createRes = service.create(data)
    expect(createRes).toBe(true);

    expect(component.form.valid).toBeFalsy();
    component.type = 'edit';
    component.Firstname = 'mohamadreza';
    component.getCustomerData();

    /// edit customer last name
    component.form.controls['Lastname'].setValue("akbari1258");

    // check to make sure form is valid
    expect(component.form.valid).toBeTruthy();

    // check to make sure edit customer is correct
    const res: boolean = component.submit();
    expect(res).toBe(true);


  });


});
