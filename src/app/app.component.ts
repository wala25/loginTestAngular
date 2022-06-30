import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-test';
 constructor(private http: HttpClient){}
apiAdress=environment.apiAdress;
SignUp=new FormGroup({
  name:new FormControl(''),
  email:new FormControl(''),
  password: new FormControl('')
    })
LogIn=new FormGroup({
    email:new FormControl(''),
    password: new FormControl('')
    })

loading=false;
message=new Array;
error=false;
submitSignUp(){if (!this.loading)
  {this.message=new Array;
    this.error=false
    this.loading=true;
  this.http.post(this.apiAdress+"signup",this.SignUp.value,{withCredentials:true}).subscribe({
    next:(res)=>{this.SignUp.reset();
                 this.loading=false;
                 this.message=['Created']},
    error:(e)=>{this.loading=false;
                this.message=e.error;
                this.error=true}
      }
  )}
}

err=new String;
userName=new String;
connect(){if (!this.loading)
  {this.userName=new String;
    this.err=new String;
    this.loading=true;
    this.http.post(this.apiAdress+"login",this.LogIn.value,{withCredentials:true}).subscribe({
      next:(res:any)=>{this.LogIn.reset();
             this.loading=false;
             this.userName=res},
      error:(e)=>{this.loading=false;
               this.err=e.error}}
    )}
}

disconnect(){this.loading=true;
  this.http.get(this.apiAdress+"disconnect",{withCredentials:true}).subscribe({
      next:()=>{this.loading=false;
             this.userName=new String}
         })
}

check(){this.loading=true;
  this.http.get(this.apiAdress+"check",{withCredentials:true}).subscribe({
      next:(res:any)=>{this.loading=false;
             this.userName=res},
      error:(e)=>{this.loading=false;}
         })
  }
   
ngOnInit() {
  this.check()
    }
}
