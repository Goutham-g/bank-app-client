import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

seData:any
balance:any
uname:any=''
acno:any
userData:any={}
alertMessage:any=''
alertColour:boolean=true
  constructor(private ds:DataService,  private router:Router ,private fb:FormBuilder , private datePipe:DatePipe){ }
  
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  // this.seData=this.sdata.smethod
  // this.sdata.smethod()
if(!localStorage.getItem('currentAcno')){
  alert('please login')
  this.router.navigateByUrl('')
}


 if(localStorage.getItem('currentUser')){
      this.uname = localStorage.getItem('currentUser')
 }
  
}
//  model form for transaction form
transaction=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  amnt:['',[Validators.required,Validators.pattern('[0-9]+')]],
  psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
})



accessUser(){
  if(localStorage.getItem('currentAcno')){
    this.acno=localStorage.getItem('currentAcno')
    //console.log(this.acno);
    
  }
  this.ds.getUser(this.acno).subscribe((result:any)=>{
     this.userData=result.message
     console.log(this.userData);
     
  })
}

checkBalance(){
  if(localStorage.getItem('currentAcno')){
    this.acno=localStorage.getItem('currentAcno')
    //console.log(this.acno);
    
  }
  this.ds.getBalance(this.acno).subscribe((result:any)=>{
       this.balance=result.message

  })


}

// logout method
logout(){
  localStorage.removeItem('currentAcno')
  localStorage.removeItem('currentUser')
  this.router.navigateByUrl('')
}

moneyTransferr(){
  if(this.transaction.valid){
    this.alertMessage=''
    
    const date=new Date()
    let latest_date = this.datePipe.transform(date,'short')
    console.log(latest_date);

    if(localStorage.getItem('currrentAcno')){
      this.acno=localStorage.getItem('currentAcno')
      
      
    } 
    if(this.acno==this.transaction.value.acno){
      this.alertMessage="Failed due to self transfer"
      this.alertColour=false
    }
    else{
                                                                                                                     // this venda 'let' use chythond          
    this.ds.moneyTransfer(this.transaction.value.acno,this.acno,this.transaction.value.amnt,this.transaction.value.psw,latest_date)
    .subscribe((result:any)=>{
      this.alertMessage=result.message
      this.alertColour=true
    },result=>
    {this.alertMessage=result.error.message;
      this.alertColour=false
    }
    
    )
    

  }
}
  else{
    this.alertMessage="Invalid Form!"
  }

}


  data='Happy Banking'

}
