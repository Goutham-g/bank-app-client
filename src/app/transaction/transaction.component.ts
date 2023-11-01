import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  acno:any
  transaction:any

  constructor(private ds:DataService){

  }

  ngOnInit():void {
    if(localStorage.getItem("currentAcno")){

     this.acno=localStorage.getItem('currentAcno')
     
     this.ds.getTransaction(this.acno).subscribe((result:any)=>{
       this.transaction=result.message
       console.log(this.transaction);
       

      
     })
    }
  }

}
