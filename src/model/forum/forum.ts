import * as firebase from 'firebase/app';
import { CATEGORY_PATH, CATEGORY, CATEGORIES } from './forum.interface';

export class Forum {
    debugPath: string = '';
    category: firebase.database.Reference;
    constructor( root ) {

    }


    createCategory( data: CATEGORY, success: () => void, error: (e) => void ) {
        return this.editCategory( data, success, error );
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
    editCategory( data: CATEGORY, success: () => void, error: (e) => void ) {

        data = this.undefinedToNull( data );


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
    deleteCategory( id: string, success: () => void, error: (e) => void ) {
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
    getCategories( success: ( categories: CATEGORIES ) => void, error: (e) => void ) {
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
     * Turns undefined into null to avoid "first argument contains undefined in property firebase" error.
     * 
     * @param obj 
     * 
     * @code
     *              data = this.database.undefinedToNull( data );
     * @endcode
     * 
     */
    undefinedToNull(obj) {
        obj = JSON.parse(JSON.stringify(obj, function (k, v) {
                if ( v === undefined ) return null;
                else return v;
            } ) );
        return obj;
    }



    //// PATHS

    get pathCategory() {
        return this.debugPath + CATEGORY_PATH;
    }

}
