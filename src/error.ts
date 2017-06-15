

export function createError( code, message ) {
    return code + ": \t" + message;
}

export function isError( m: string ){
    if ( typeof m != 'string' ) return false;
    if ( m.indexOf(": \t") == -1 ) return true;
    else false;
}

export function isErrorOf( errstr: string, code: string ) {
    if ( isError( errstr ) ) return errstr.indexOf( code ) === 0;
    else return false;
}


export const ERROR = {
    category_id_empty: 'category_id_empty',
    malformed_key:'malformed_key',
    no_categories: 'no_categories',
    category_exists: 'category_exists',
    category_not_exist: 'category_not_exist'
};


