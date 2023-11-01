import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  pswCheck:boolean=false

  acno:any
  uname:any
  psw:any
  cpsw:any

  // import data service .register to this class use dpndcy inct
  constructor(private ds:DataService, private router:Router, private fb:FormBuilder){}
  

// reactive model for register----
registerForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
  psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]],
  cpsw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
})


pdata='Enter username'

register(){
// console.log(this.acno);

var path=this.registerForm.value  // store the path

var acno=path.acno
var uname=path.uname
var psw=path.psw
var cpsw=path.cpsw

if(this.registerForm.valid){
  
  if(psw==cpsw){
    this.ds.register(acno,uname,psw).subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl("")
    },result =>{
      alert(result.error.message)
    })
  
  }else{
    this.pswCheck=true
  // alert('Password doesnt match')
  }
}else{
  alert('invalid form')
}





console.log(acno);
console.log(uname);
console.log(psw);
console.log(cpsw);

}
}
