import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private empservice: EmployeeService) { }
  empData: any;
  
  ngOnInit(): void {
    this.http.get("http://localhost:4100/employee/getEmp").subscribe((getData)=>{
      this.empData = getData
    })
  }

  updateData(emp: any){
    this.empservice.setEmpData(emp);
    // console.log(emp);
    this.router.navigateByUrl('/updateemp');
  }

 
  // deleteData(empid: any){
    // this.http.delete(`http://localhost:4100/employee/deleteEmp/${empid}`)
    //   .subscribe(
    //    (data) => {
    //     console.log(data);
    //     if(data){
    //       this.ngOnInit();  
    //     }
    //   });
  // }

  deleteData(empid: any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:4100/employee/deleteEmp/${empid}`)
        .subscribe(
         (data) => {
          if(data){
            swalWithBootstrapButtons.fire({
              title: data,
              // text: "employee details has been deleted.",
              icon: "success"
            });
            this.ngOnInit();  
          }
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          // text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  addEmployee(){
    this.router.navigate(['/addemployee']);
  }
}
