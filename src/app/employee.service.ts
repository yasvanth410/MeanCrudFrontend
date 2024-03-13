import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
  private empDataSubject = new BehaviorSubject<any>(null);
  empData$ = this.empDataSubject.asObservable();

  setEmpData(data: any) {
    this.empDataSubject.next(data);
  } 
}
