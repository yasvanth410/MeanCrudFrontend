import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {

  constructor(private http: HttpClient) { }

  addForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    role: new FormControl(null, Validators.required), 
    companyName: new FormControl(null, Validators.required),
    mobile: new FormControl(null, [Validators.required, Validators.minLength(10), this.startingNum]),
    address: new FormControl(null, [Validators.required])
  })

  getData(){
    // console.log(this.addForm.value);
    this.http.post("http://localhost:4100/employee/addEmployee", this.addForm.value)
          .subscribe((response) => {
            // console.log(response);
            // sweet alert message
            Swal.fire({
              position: "center",
              icon: "success",
              title: response,
              showConfirmButton: false,
              timer: 2000
            });
          })
    this.addForm.reset("");
  }

  startingNum(c: any){
    let pattern = /^[6-9]\d*$/
    if(pattern.test(c.value)){
      return null
    }else{
      return {"invalidNum": true}
    }
  }

  // getData(){
  //   console.log(this.addForm.value);
  // }
}
