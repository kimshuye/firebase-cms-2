/**
 * 
 * 
 * @code How to push
 * 
        this.database.root.child('admin')
            .push( { 'myid': true } )
            .then( r => console.log('success') )
            .catch( e => console.error(e) );

 * @endcode
 * 
 * 
 * @code How to read
 * 
        this.database.root.child('admin').child( this.uid ).once('value')
            .then( s => {
            let re = s.val();
            console.log(`${this.uid} is admin ? ${re}`);
                if ( re === true ) this._isAdmin = true;
            });
 * 
 * @endcode
 * 
 */
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
@Injectable()
export class Database {

    root: firebase.database.Reference;
    constructor(
        private angularFireDatabase: AngularFireDatabase ) {
        //
        this.root = angularFireDatabase.database.ref('/');        
    }
}