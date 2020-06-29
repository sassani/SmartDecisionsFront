import { Address } from "./address";
import { Image } from './image';
export class Profile {

    constructor() {}
    firstName: string = null;
    lastName: string = null;
    company: string = null;
    address: Address[] = null;
    avatar:Image = null;
}