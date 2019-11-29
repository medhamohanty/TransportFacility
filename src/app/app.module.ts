import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewRideComponent } from './new-ride/new-ride.component';
import { PickRideComponent } from './pick-ride/pick-ride.component';
import { FormBuilder,FormGroup,Validators,FormArray,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: 'app-new-ride', component: NewRideComponent },
  { path: 'app-pick-ride', component: PickRideComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NewRideComponent,
    PickRideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
