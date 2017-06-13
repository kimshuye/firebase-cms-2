

export const CATEGORY_PATH = 'forum/category';


export interface CATEGORY {
    id: string;
    name?: string;
    description?: string;
    owner?: string;
}

export type CATEGORIES = Array<CATEGORY>;
