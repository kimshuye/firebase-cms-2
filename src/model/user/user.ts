import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
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
    constructor( private angularFireAuth: AngularFireAuth ) {
        this.auth = angularFireAuth.auth;
    }

    register( data: USER_REGISTER ) : Observable<firebase.User> {
        let promise = this.auth.createUserWithEmailAndPassword( data.email, data.password );
        return Observable.fromPromise( promise );
    }


}