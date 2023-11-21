import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEye, faPencil, faTrash, faEnvelope, faXmark, faCheck, faFileCsv, faFilePdf, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { UtilitiesService } from 'src/app/services/utilities.service'
import { EmployeeState } from 'src/app/store/state/employee.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/utils/registerinterface';
import { DeleteEmployee, GetEmployee } from 'src/app/store/actions/employee.action';
import { RegisterService } from 'src/app/services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Papa } from 'ngx-papaparse';
import { FileSaverService } from 'ngx-filesaver'

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
  @Output() isEditRecord = new EventEmitter();
  @Select(EmployeeState.GetEmployeeList) employees$:Observable<Employee>;
  @Select(EmployeeState.employeeLoaded) employeeLoaded$:Observable<boolean>
  empLoadedSub:Subscription;
  allEmployees: any;
  filteredEmployees: any;
  searchQuery: string = '';
  selectedFilter: string = 'byName';
  pageNumber: number = 1;
  isSearch: boolean = false;
  faEye = faEye;
  faPencil = faPencil;
  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faXmark = faXmark;
  faCheck = faCheck;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faMagnifyingGlass = faMagnifyingGlass;
 
  
  constructor( 
    private _utililitesService: UtilitiesService,
    private registerService: RegisterService,
    private store:Store,
    private _toastrService : ToastrService,
    private papa: Papa,
    private fileSaverService: FileSaverService) {
  }

  ngOnInit(): void {
    this.fetchAllEmployees();
  }

  fetchAllEmployees(): void {
    this.allEmployees = this._utililitesService.getData();
    this.filter();
    console.log(this.allEmployees);
    if(this.allEmployees.length === 0){
        this.getEmployees();
        this.employees$.subscribe(res => {
          this.allEmployees = res;
          this.filter();
        })
    }
  }

  filter(): void {
    if (!this.searchQuery) {
      this.isSearch =false;
      this.filteredEmployees = this.allEmployees;
    } else {
      if (this.selectedFilter === 'byName') {
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.employee_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else if (this.selectedFilter === 'byEmail') {
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else if (this.selectedFilter === 'byEmpId') {
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.employee_id.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else if (this.selectedFilter === 'byContact') {
        this.filteredEmployees = this.allEmployees.filter((emp: any) => emp.contact_no.toString().includes(this.searchQuery.toString()))
      }
    }
  }

  onSearchChange(): void{
    this.pageNumber = 1;
    this.isSearch = true;
    this.filter();
  }

  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.filter();
  }
  //Export To CSV
  exportToCsv() {
    const csvData = this.papa.unparse(this.filteredEmployees, {header: true})

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    this.fileSaverService.save(blob, 'employeelist.csv');
  }

  getEmployees(){
   this.empLoadedSub = this.employeeLoaded$.subscribe(loadedEmployee =>{
       if(!loadedEmployee){
         this.store.dispatch(new GetEmployee());
       }
     })
   }
   
   editRecord(res:any): void{
    console.log(res);
    var data = {
      isEditMode: true,
      Record: res
    }
    this.isEditRecord.emit(data);
   }

   deleteEmployee(objId: string): void{
      const loggedInUserData: any = this.registerService.LoggedInUserData();
      const parsedData = JSON.parse(loggedInUserData);
      const deletedBy = `${parsedData.employee_name}(${parsedData.employee_id})`;
      this.registerService.deleteEmployee(objId, deletedBy).subscribe({
        next: (res) =>{
        if(res.success){
          this.store.dispatch(new DeleteEmployee(objId))
          this._toastrService.success('Record Edited Successfully', res.message);
        }else{
          this._toastrService.success('Message Error!', res.message);
        }
      },
        error: (err) =>{
        let errorObj = err;
        if(errorObj.userError){
          this.registerService.signout();
        }
      }})
   }
}
