import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'addemployee', component:AddEmployeeComponent
  },
  {
    path:'emplist', component:EmployeeListComponent
  },
  {
    path:'elist', component:EmployeeListComponent
  },
  {
    path:'updateemp', component: UpdateEmployeeComponent
  },
  {
    path:'**', component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
