import * as firebase from 'firebase/app';
import {
    CATEGORY_PATH, CATEGORY, CATEGORIES, POST, POST_DATA_PATH, CATEGORY_POST_RELATION_PATH
} from './forum.interface';

export class Forum {
    debugPath: string = '';
    constructor( public root: firebase.database.Reference ) {

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

    //////////////
    /// POST
    //////////////

    createPost( post: POST, success: (post:POST) => void, error: (e) => void ) {

        let ref = this.postData.push();
        console.log("push key: ", ref.key );
        this.setPostData( ref, post, success, error );

    }



    /**
     * 
     * It sets post data on a post reference.
     * 
     * 'Set post data' means to set data on a reference. So, you need 'ref' to set where.
     * 
     * @param ref 
     * @param post 
     * @param success 
     * @param error 
     */
    setPostData( ref: firebase.database.ThenableReference, post: POST, success: (post:POST) => void, error: (e) => void ) {
        post.key = ref.key;
        post.stamp = Math.round( (new Date()).getTime() / 1000 );
        ref.set( post ).then( () => success( post ) ).catch( error );
    }





    //// FUNCTIONS


    /**
     * 
     * @param key - is the post push key.
     * @param post 
     */
    setCategoryPostRelation( key: string, post: POST ) {

        // @todo error handling
        // what is no categories?
        console.log(post);
        let categories = Object.keys( post.categories );
        let p;
        for ( let category of categories ) {
            console.log(`category test : ${category}`);
            if ( post.categories[ category ] === true ) {
                console.log(`writing category: ${category}`);
                p = this.categoryPostRelation.child( category ).child( key).set( { uid: post.uid } );
            }
        }

        // @todo big problem here. return proper promise.
        return p;

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

    get category() : firebase.database.Reference {
        return  this.root.ref.child( this.categoryPath );
    }
    get categoryPath() : string {
        return this.path( CATEGORY_PATH );
    }

    get postData() : firebase.database.Reference {
        return  this.root.ref.child( this.postDataPath );
    }
    get postDataPath() : string {
        return this.path( POST_DATA_PATH );
    }
    get categoryPostRelation() : firebase.database.Reference {
        return  this.root.ref.child( this.categoryPostRelationPath );
    }
    get categoryPostRelationPath() : string {
        return this.path( CATEGORY_POST_RELATION_PATH );
    }
    


    path( p: string ) {
        return this.debugPath + CATEGORY_PATH;
    }


    ////////////////////////////////////
    ////
    ////    POST
    ////
    ////////////////////////////////////
    
    

}
