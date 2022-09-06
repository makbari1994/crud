import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditComponent } from './components/crud/create-edit/create-edit.component';
import { CustomerListComponent } from './components/crud/customer-list/customer-list.component';

const routes: Routes = [
  { path: '', component: CreateEditComponent },
  { path: 'create-edit', component: CreateEditComponent },
  { path: 'create-edit/:Firstname', component: CreateEditComponent },
  { path: 'list', component: CustomerListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
