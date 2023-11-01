import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //   sdata="hello hi"

  
  // constructor() { }
  // smethod(){
  //   alert('service method working')
  // }

      constructor(private http:HttpClient){}

      // api to register

      register(acno:any,uname:any,psw:any){
        const bodyData={
          acno,
          uname,
          psw
        }
        return this.http.post('http://localhost:3000/register',bodyData)
      }
 
//  api to login
      
      login(acno:any,psw:any){
        const bodyData={
          acno,psw
        }

        return this.http.post('http://localhost:3000/login',bodyData)
      }


//  api to get single user data

getUser(acno:any){
  return this.http.get('http://localhost:3000/getuser/'+ acno)
}

//get balance api

getBalance(acno:any){
  return this.http.get('http://localhost:3000/getbal/'+ acno)
}

//  api to money transfer

moneyTransfer(toAcno:any,fromAcno:any,amount:any,psw:any,date:any){
  const body={
    toAcno,fromAcno,amount,psw,date
  }
  return this.http.post('http://localhost:3000/transfer',body)
}

//api to get transaction array

getTransaction(acno:any){
  
  return this.http.get('http://localhost:3000/history/'+acno)
}


}


