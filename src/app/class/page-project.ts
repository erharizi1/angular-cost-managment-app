import { Project } from './project';

export class PageProject {

    content: Project[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number ;
    first: boolean ;
    sort: string ;
    numberOfElements: number ;
}
