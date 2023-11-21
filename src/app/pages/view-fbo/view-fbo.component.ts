import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-view-fbo',
  templateUrl: './view-fbo.component.html',
  styleUrls: ['./view-fbo.component.scss']
})
export class ViewFboComponent implements OnInit {
  @Input() public fboData: any;
  fulladdress: any;
  recipientData: any;
  isfostac:boolean= false;
  faIndianRupeeSign = faIndianRupeeSign;
  constructor(public activeModal: NgbActiveModal) { 
  }

  ngOnInit(): void {
    console.log(this.fboData)
   /*  if(this.fboData.fbo_type === 'Fostac Training'){
      this.isfostac == true;
    }else{
      this.isfostac == false;
    } */
    this.isfostac = true?this.fboData.fbo_type === 'Fostac Training' : this.isfostac = false;
   this.fulladdress =  this.fboData.address+", "+ this.fboData.district+", "+ this.fboData.state;
   this.recipientData = this.fboData.recipientDetails;
  
  }
  closeModal() {
    this.activeModal.close();
  }

}
