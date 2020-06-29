import { FormGroup } from '@angular/forms';

export class FormTools{
    public static getChangedValues(formGroup:FormGroup){
        console.log('target object', formGroup.value);
        var temp = Object.entries(formGroup.controls).filter(el => el[1].dirty).map(p => {
            return {
                name: p[0], value: p[1].value
            }
        });
        var changedValues = {};
        temp.forEach(element => {
            changedValues[element.name] = element.value;
        });
        return changedValues;
    }
}