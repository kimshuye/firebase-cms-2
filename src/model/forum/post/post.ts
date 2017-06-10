import { Injectable } from '@angular/core';

import { Database } from './../../database/database';
import * as firebase from 'firebase/app';

import { User } from './../../user/user';





const POST_META_PATH = 'forum/post-meta';
const POST_CONTENT_PATH = 'forum/post-content';
const CATEGORY_POST_RELATION_PATH = 'forum/category-post-relation';
const POST_LIKE_PATH = 'forum/post-likes';
const POST_DISLIKE_PATH = 'forum/post-dislikes';


export interface POST_META {
    uid: string;
    subject: string;
    stamp: number;
};
export interface POST extends POST_META {};
export interface POST_EDIT {
    key?: string;
    categories?: { [ v:string ]: boolean };
    subject?: string;
    content?: string;
    sticky_forum?: boolean;
    sticky_all_forum?: boolean;
};
export interface POST_CREATE extends POST_EDIT {};

@Injectable()
export class Post {

    // post: firebase.database.Reference;

    constructor(
        private database: Database,
        private user: User
    ) {
        // this.post = this.database.root.child( POST_PATH );
    }

    get postMeta() : firebase.database.Reference {
        return this.database.root.child( POST_META_PATH );
    }
    get postContent() : firebase.database.Reference {
        return this.database.root.child( POST_CONTENT_PATH );
    }
    get categoryPostRelation() : firebase.database.Reference {
        return this.database.root.child( CATEGORY_POST_RELATION_PATH );
    }
    

    create( data: POST_CREATE, success: (post:POST_CREATE) => void, error: (e) => void ) {

        let ref = this.postMeta.push();
        console.log("push key: ", ref.key );
        this.setPostMeta( ref, data, success, error );

    }

    update( data: POST_CREATE, success: (post:POST_EDIT) => void, error: (e) => void ) {
        
        // this.setPostMeta( ref, data, success, error );
    }

    private setPostMeta( ref: firebase.database.ThenableReference, data: POST_CREATE, success: (post:POST_EDIT) => void, error: (e) => void ) {
        let meta: POST_META = {
            uid: this.user.uid,
            subject: data.subject,
            stamp: Math.round( (new Date()).getTime() / 1000 )
        };
        ref.set( meta )
            .then( () => {
                this.postContent.child( ref.key ).set( { content: data.content } )
                    .then( () => {
                        /// Save categories of a post. Error callback will be returned if there is any error.
                        let categories = Object.keys( data.categories );
                        for( let category of categories ) {
                            this.categoryPostRelation.child( category ).child( ref.key ).set( { value: true } ).catch( error );
                        }
                        data.key = ref.key;
                        success( data );
                    } )
                    .catch( error )
            })
            .catch( error );
    }

}