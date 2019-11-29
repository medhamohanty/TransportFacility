import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormArray,ReactiveFormsModule, FormsModule,FormControl } from '@angular/forms';

@Component({
  selector: 'app-pick-ride',
  templateUrl: './pick-ride.component.html',
  styleUrls: ['./pick-ride.component.css']
})
export class PickRideComponent implements OnInit {
  myform2: FormGroup;
  VehicleTypes: FormControl;
  TimeSelected:FormControl;
  EmployeeIDCheck:FormControl;
  EmployeeID:FormControl;
  filteredArray: any[] =[];
  msg: string;
  msg1: string;
  public edited = false;
  public maxDataCheck = false;
  pickrideArray: any[] = [];
  pickride: any[] = [];
 pickrides: any = new Object();
 availedRides: any[] = [];
 availedrideObj = new Object();
 public maxData1 = false;
  
 
  constructor(private fb: FormBuilder) {
    
    }
  
  ngOnInit() {
    this.createSearchControls();
    this.createSearchForm();

    this.pickrideArray = JSON.parse(localStorage.getItem("rideArray"));
    this.pickride = JSON.parse(localStorage.getItem("rideArray"))

  }

  createSearchControls() {
    this.VehicleTypes = new FormControl('', Validators.required);
    this.TimeSelected = new FormControl('', Validators.required);
    this.EmployeeIDCheck = new FormControl('', Validators.required);
    this.EmployeeID = new FormControl('', Validators.required);
  }

  createSearchForm() {
    this.myform2 = new FormGroup({
      VehicleTypes: this.VehicleTypes,
      TimeSelected: this.TimeSelected,
      EmployeeIDCheck: this.EmployeeIDCheck,
      EmployeeID: this.EmployeeID,
      
    });
  }
  resetf(form: any){
    form.resetForm();
    
  }

  submit(form: any){
    if(!form.EmployeeID){
      this.maxData1 = true;
      return;
    }
    if(form.EmployeeID && form.EmployeeID.length <6){
      this.maxData1 = true;
      return;
    }

    this.edited = false;
    console.log(this.pickrideArray);
    this.pickride =  this.pickrideArray.filter(x => x.Time == 
      form.TimeSelected && x.VehicleType == form.VehicleTypes 
      && x.EmployeeID != form.EmployeeID);
  console.log(this.filteredArray);

      
  }

  confirmPickUp(index,element: any)
  {
   if(element){
    if(this.availedRides.length >0 ){
      let a = this.availedRides.find(x => x  == element.EmployeeID);
      if(a){
        this.msg = this.pickride[index].EmployeeID;
        this.msg1 = this.pickride[index].Time;
        this.edited = true;
        return;
      }else alert("You can only confirm one ride.");
    }else{
      this.msg = this.pickride[index].EmployeeID;
      this.msg1 = this.pickride[index].Time;
      this.edited = true;
    }
    this.availedrideObj = this.myform2.value.EmployeeID;

    this.availedRides.push(this.availedrideObj);
   }else {
     alert("Error");
   }
    

    
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.maxDataCheck = true;
      return false;
    }
    return true;

  }

}
