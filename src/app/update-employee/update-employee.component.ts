import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private empservice: EmployeeService, private router: Router) { }
  
  empData: any;
  _id: any;
  ngOnInit(): void { 
    this.empservice.empData$.subscribe((data)=>{
      if(data){
        this.empData = data;
        this.updateForm.patchValue(data);
        if(this.empData && this.empData._id){
          this._id = this.empData._id
        }else{
          console.error('empData or _id is undefined');
        }
      }
    });
  }


  updateForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    role: new FormControl(null, Validators.required), 
    companyName: new FormControl(null, Validators.required),
    mobile: new FormControl(null, [Validators.required, Validators.minLength(10), this.startingNum]),
    address: new FormControl(null, [Validators.required])
  })
  


  startingNum(c: any){
    let pattern = /^[6-9]\d*$/
    if(pattern.test(c.value)){
      return null
    }else{
      return {"invalidNum": true}
    }
  }


  updateData(){
    const includedId = {
      id: this._id,
      ...this.updateForm.value
    }
    // console.log(includedId);
    this.http.put("http://localhost:4100/employee/updateEmp", includedId)
    .subscribe((data) => {
      if(data){
        Swal.fire({
          position: "center",
          icon: "success",
          title: data,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/emplist']);
      }
    })  
  }

}
