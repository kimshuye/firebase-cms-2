import { Injectable } from '@angular/core';
import { Database } from './../../database/database';
import * as firebase from 'firebase/app';



interface CATEGORY {
    id: string;
    name?: string;
    description?: string;
    owner?: string;
}

export interface CATEGORY_EDIT extends CATEGORY {};
export interface CATEGORY_CREATE extends CATEGORY_EDIT {};


export type CATEGORIES = Array<CATEGORY>;

const CATEGORY_PATH = 'forum/category';

@Injectable()
export class Category {


    category: firebase.database.Reference;
    constructor(
        private database: Database
    ) {
        this.category = this.database.root.child( CATEGORY_PATH );
    }



    create( data: CATEGORY_CREATE, success: () => void, error: (e) => void ) {
        return this.edit( data, success, error );
    }

    /**
     * 
     * @param data 
     * @param success 
     * @param error 
     * 
     * @code
            this.category.create( { id: this.category_name }, () => {
            console.log("create ok")
            }, e => {
            console.error(e);
            } );
     *
     * @endcode
     */
    edit( data: CATEGORY_EDIT, success: () => void, error: (e) => void ) {

        data = this.database.undefinedToNull( data );


        console.log("data: ", data);

        this.category.child(data.id).set( data )
            .then( success )
            .catch( error );
    }



    /**
     * 
     * Deletes a forum category
     * 
     * @param id 
     * @param success 
     * @param error 
     * 
     * @code
     *      this.category.delete( id, () => console.log("Category deleted"), e => console.error(e) );
     * @endcode
     * 
     */
    delete( id: string, success: () => void, error: (e) => void ) {
        this.category.child( id ).set( null )
            .then( success )
            .catch( error );
    }


    /**
     * 
     * Use this method to get all the categores. But no live-update. Only get all categories.
     * 
     * @param success 
     * @param error 
     * 
     * @code
    
                    this.gets( (categories:CATEGORIES) => {
                        console.log('categories:', categories);
                    }, e => console.error(e) );

     * @endcode
     */
    gets( success: ( categories: CATEGORIES ) => void, error: (e) => void ) {
        let categories: CATEGORIES = [];
        this.category.once('value').then( snapshot => {
            //console.log(snapshot.val());
            let val = snapshot.val();
            for( let k of Object.keys(val) ) {
                let v = val[k];
                //console.log(v);
                categories.push( v );
            }
            success( categories );
        }, e => error );
        
    }



    /**
     * 
     * Use this to live-update.
     * 
     * @code
     
                this.category.observe().subscribe( res => {
                    console.log(res);
                    this.categories = res;
                });

     * @endcode
     */
    observe() {
        return this.database.af.list( CATEGORY_PATH );
    }
}