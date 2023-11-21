import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscriber, Subscription, interval } from 'rxjs';
import { GetdataService } from 'src/app/services/getdata.service';
import { GetEmployee } from 'src/app/store/actions/employee.action';
import { Employee } from '../../utils/registerinterface';
import { EmployeeState } from 'src/app/store/state/employee.state';
import { RegisterService } from 'src/app/services/register.service';
import {UtilitiesService} from 'src/app/services/utilities.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  employees: Employee;
  genericData:any;
  data:any;
  empName:String;

  @Select(EmployeeState.GetEmployeeList) employees$:Observable<Employee>;
  @Select(EmployeeState.employeeLoaded) employeeLoaded$:Observable<boolean>
  empLoadedSub:Subscription;
  msg: Subscription;
  dnone:boolean =true;
  constructor(
    private _registerService: RegisterService,
    private store:Store,
    private _utilitiesService:UtilitiesService
  ){ }
  ngOnInit(): void {
      this.getEmployees();
      this.employees$.subscribe(res => {
       this.data = res;
       console.log(this.data)
      })
      let loggedInUserData:any = this._registerService.LoggedInUserData(); 
      loggedInUserData = JSON.parse(loggedInUserData)
      this.empName = loggedInUserData.employee_name;
      const message = interval(2000);
      this.msg = message.subscribe( (res)=> {
        if(res >=2){
          this.dnone = false;
          this.msg.unsubscribe()
        }
      })
  }

getEmployees(){
 this.empLoadedSub = this.employeeLoaded$.subscribe(loadedEmployee =>{
    if(!loadedEmployee){
      this.store.dispatch(new GetEmployee());
    }
  })
}
ngOnDestroy(): void {
  this.empLoadedSub.unsubscribe();
}
}
