import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';





export interface USER_REGISTER {
    name: string;
    email: string;
    password: string;
}

export interface USER_REGISTER_RESONSE {

}

@Injectable()
export class User {

    auth;


    constructor( ) {
        
        this.auth = firebase.auth();



        
    }


    register( data: USER_REGISTER ) {
        let promise = this.auth.createUserWithEmailAndPassword( data.email, data.password );
        return Observable.fromPromise( promise );
    }


}