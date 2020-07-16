import { Contact } from "./contact";
import { Image } from './image';
export class Profile {

    constructor() {}
    firstName: string = null;
    lastName: string = null;
    company: string = null;
    contacts: Contact[] = [];
    avatar:Image = null;
}