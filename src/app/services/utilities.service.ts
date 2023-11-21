import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  employeeData: any = [];

public setData(data:any) { // call this method from the component and pass the result you get from the API to set it in the service
  this.employeeData = data;
}


public getData() { // call this method from the component to get the already set data
  return this.employeeData;
}
}
