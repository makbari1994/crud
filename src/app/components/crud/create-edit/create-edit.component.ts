import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from 'src/app/interfaces/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {
  form: FormGroup;
  res: boolean = false;
  resMessage: string = '';
  type: string = 'create';
  customerList: Array<ICustomer> = [];
  Firstname: string = '';
  submited: boolean = false;
  customer: ICustomer = {} as ICustomer;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      Firstname: ['', [
        Validators.required,
        Validators.minLength(2)]],
      Lastname: ['', [
        Validators.required,
        Validators.minLength(2)]],
      DateOfBirth: ['', [
        Validators.required,
        Validators.minLength(6)]],
      PhoneNumber: ['', [
        Validators.required,
        Validators.minLength(10)]],
      Email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")]],
      BankAccountNumber: ['', [
        Validators.required,
        Validators.minLength(6)]],
    });
    this.getParams();

  }

  getParams() {
    this.Firstname = this.activatedRoute.snapshot.params['Firstname'];
    if (this.Firstname) {
      this.type = 'edit';
      this.getCustomerData();
    }
    else {
      this.type = 'create';
    }
  }

  getCustomerData() {
    this.customerList = this.customerService.getStorage();
    const customer = this.customerList.find(a => a.Firstname == this.Firstname);
    if (customer && Object.keys(customer).length > 0) {
      this.form.controls['Firstname'].setValue(customer.Firstname)
      this.form.controls['Lastname'].setValue(customer.Lastname)
      this.form.controls['DateOfBirth'].setValue(customer.DateOfBirth)
      this.form.controls['Email'].setValue(customer.Email)
      this.form.controls['PhoneNumber'].setValue(customer.PhoneNumber)
      this.form.controls['BankAccountNumber'].setValue(customer.BankAccountNumber)
    }

  }


  submit() {

    this.submited = true;
    if (this.form.valid) {
      this.customer = { ...this.form.value };
      if (this.type == 'create') {
        return this.create();
      }
      else {
        return this.edit();
      }
    }
    return false
  }

  create() {
    this.res = this.customerService.create(this.customer);
    if (this.res) {
      this.resMessage = 'Customer Was Added';
    }
    else {
      this.resMessage = 'Customer already Exists';
    }
    return this.res;
  }

  edit() {
    this.res = this.customerService.edit(this.customer, this.Firstname);
    if (this.res) {
      this.resMessage = 'Customer was Edited';
    }
    else {
      this.resMessage = 'Customer Not Exists';
    }
    return this.res;
  }

}

