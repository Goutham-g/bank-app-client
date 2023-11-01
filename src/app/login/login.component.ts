import { Component, OnInit } from '@angular/core';
import{ Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
data="happy banking"
serviceData:any

acno:any  //data bind cheyunn
psw:any

constructor(private rout:Router,private ds:DataService, private fb:FormBuilder){}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  // this.serviceData=this.ds.sdata
  // console.log(this.serviceData);
  // this.ds.smethod()


 



  
}

 //model ------------------

loginForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
})


login(){
  var acno=this.loginForm.value.acno
  var psw=this.loginForm.value.psw
  
  
  if(this.loginForm.valid){


    this.ds.login(acno,psw).subscribe((result:any)=>{

      localStorage.setItem('currentUser',result.currentUser)
      localStorage.setItem('currentAcno',result.currentAcno)
       
      alert(result.message)
      this.rout.navigateByUrl("user")
  
  
    },
    result=>{
      alert(result.error.message)
      
    })
  
    // console.log(a.value);
    
    // alert('login clicked')
    // this.rout.navigateByUrl('user')
  
    // console.log(this.acno);
    // console.log(this.psw);

  }else{
    alert('invalid form')
  }

  
  
}

}
