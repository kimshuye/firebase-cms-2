import { Injectable } from '@angular/core';
import { Category, CATEGORIES } from './category';

@Injectable()
export class CategoryTest {

    private d: Date;
    constructor(private category: Category) {
        this.d = new Date();
    }


    run() {

        // this.createCategory( () => { });

        // this.getCategories( (categories:CATEGORIES) => {
        //     console.log('categories:', categories);
        // }, e => console.error(e) );

    }

    createCategory( callback ) {

        let name = 'category' + this.d.getDate() + this.d.getHours() + this.d.getMinutes() + this.d.getSeconds();
        
        this.category.create( { id: 'test' }, () => {
           console.log("createCateogry: ok");
        },
        e => {
            console.error(e);
        });

    }

    getCategories( success, error ) {
        this.category.gets( success, error );
    }
}