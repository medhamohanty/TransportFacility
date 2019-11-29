import { Component, OnInit,Output  } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormArray,ReactiveFormsModule, FormsModule,FormControl } from '@angular/forms';
import {Router, Route} from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-ride',
  templateUrl: './new-ride.component.html',
  styleUrls: ['./new-ride.component.css'],
  
})
export class NewRideComponent implements OnInit {
      myform: FormGroup;
      EmployeeID: FormControl;
      VehicleType:FormControl;
      VehicleNo:FormControl;
      VacantSeats:FormControl;
      Time:FormControl;
      PickPoints:FormControl;
      Destination:FormControl;
      rideArray: any[] = [];
      mRideArray : any[]= [];
      public maxData = false;
      
    
      rides: any = new Object();
       constructor(private fb: FormBuilder, private _router:Router) { }

  ngOnInit() {
   //
    this.mRideArray  = [];
   // localStorage.setItem("rideArray",JSON.stringify(this.mRideArray));
    this.createFormControls();
    this.createForm();
    if(JSON.parse(localStorage.getItem("rideArray"))){
      this.mRideArray = JSON.parse(localStorage.getItem("rideArray"));

    }


      
  }

  createFormControls() {
    this.EmployeeID = new FormControl('');
    this.VehicleType = new FormControl('', Validators.required);
    this.VehicleNo = new FormControl('', Validators.required);
    this.VacantSeats = new FormControl('', Validators.required);
    this.Time = new FormControl('', Validators.required);
    this.PickPoints = new FormControl('', Validators.required);
    this.Destination = new FormControl('', Validators.required);

   
     
  }

  createForm() {
    this.myform = new FormGroup({
      EmployeeID: this.EmployeeID,
      VehicleType: this.VehicleType,
      VehicleNo: this.VehicleNo,
      VacantSeats: this.VacantSeats,
      Time: this.Time,
      PickPoints: this.PickPoints,
      Destination: this.Destination,
    });
  }

  reset(form: any){
  //  form.resetForm();
  form.reset();
    this.rides.VehicleType = 'select vechile type';
    this.rides.PickPoints = 'select Pick Point';
    this.rides.Destination = 'select Drop Point';
  }

  submit(form: any,lbl:any){

    if(!form.EmployeeID){
      this.maxData = true;
      return;
    }
    if(form.EmployeeID && form.EmployeeID.length <6){
      this.maxData = true;
      return;
    }
    let lRideArray : any[] = [];
    this.rideArray.push(form);
    //lRideArray = this.rideArray;
    if(this.mRideArray && this.mRideArray.length > 0){
      let a = this.mRideArray.find(x => x.EmployeeID == form.EmployeeID);

      if(a){
        alert("One Employee can schedule ride only once.");
      }else{
        this.mRideArray.push(form);
        
      }
      
    }else{
      this.mRideArray.push(form);
      
    } 
    localStorage.setItem("rideArray",JSON.stringify(this.mRideArray));
    

    
    //this._router.navigate(["app-pick-ride"]);


   
    console.log(this.rideArray);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.maxData = true;
      return false;
    }
    return true;

  }

}
