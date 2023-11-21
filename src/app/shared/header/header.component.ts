import { Component, OnInit, Input } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    "(window:resize)": "onWindowResize($event)"
  }
})
export class HeaderComponent implements OnInit {
  toggelShow: boolean = false;
  toggelNotification: boolean = false;
  width: number = window.innerWidth;
  toggelStyle: object = {
    'position': 'absolute',
    'inset': '0px 0px auto auto',
    'margin': '0px; transform: translate3d(0.666667px, 28px, 0px)'
  }
  public getScreenWidth: any;

  @Input() item: boolean;
  @Input() userdata: any;
  @Input() isSideBar: boolean;
 
  blockMsg: boolean = true;
  empName: any;
  constructor(private _registerService: RegisterService) {
    let isLoggedIn = this._registerService.isLoggedIn();
    if (isLoggedIn) {
      let loggedInUserData: any = this._registerService.LoggedInUserData();
      loggedInUserData = JSON.parse(loggedInUserData);
      this.userdata = loggedInUserData.employee_name;
      this.empName = loggedInUserData.employee_name;
      //console.log(this.empName);
    }
    if(this.width >= 1200){
      this.isSideBar = true;
    }
   
  }
  ngOnInit() {  }

//Window size
  onWindowResize(event: any) {
    this.width = event.target.innerWidth;
    if(this.width >= 1200){
      this.isSideBar = true;
    }else{
      this.isSideBar = false;
    }
  }
  toggleClass = (event: any) => {
    this.toggelShow = !this.toggelShow;
    event.target.classList.toggle('show');
  }
  logout() {
    this._registerService.signout();
  }

  sideBarToggle(event: any) {
    this.isSideBar = !this.isSideBar;
  }
  sideBarToggleUpdate(val: any) {
    this.isSideBar = val;
  }
}