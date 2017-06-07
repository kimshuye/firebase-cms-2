import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';


export interface USER_REGISTER {
    email: string;
    password: string;
    displayName: string;
    photoUrl: string;
}

export interface USER_REGISTER_RESONSE {
}

@Injectable()
export class User {
    auth: firebase.auth.Auth;
    constructor(private angularFireAuth: AngularFireAuth) {
        this.auth = angularFireAuth.auth;
    }

    /**
     * 
     * @param data 
     */
    create(data: USER_REGISTER): Promise<firebase.User> {
        return <Promise<firebase.User>><any>this.auth.createUserWithEmailAndPassword(data.email, data.password);
    }

    update(user: firebase.User, data: USER_REGISTER ) : firebase.Promise<void> {
        return user.updateProfile({
                    displayName: data.displayName,
                    photoURL: data.photoUrl
                });
    }


    /**
     * 
     * @note Callback style function
     * 
     * @param data - user registration data.
     * @param success 
     * @param error 
     */
    register( data: USER_REGISTER, success, error ) {

        this.create( data )
            .then( user => this.update( user, data ) )
            .then( success )
            .catch( error );

    }







}