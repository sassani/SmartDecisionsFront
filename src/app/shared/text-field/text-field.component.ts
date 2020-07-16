import { Component, Self, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';

@Component({
    selector: 'text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['../../../styles/form.css', './text-field.component.css']
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {
    @Input() placeholder: string;
    @Input() formControl: FormControl;
    @Input() id: string;
    @Input() type: string;
    isRequierd: boolean = false;
    constructor(
        @Self() public ngControl: NgControl,
    ) {
        this.ngControl.valueAccessor = this;
    }


    writeValue(obj: any): void {
    }
    registerOnChange(fn: any): void {
    }
    registerOnTouched(fn: any): void {
    }
    setDisabledState?(isDisabled: boolean): void {
    }

    ngOnInit() {
        if (!!this.formControl.validator) {
            this.isRequierd = this.formControl.validator(this.formControl).required;
        }
    }

}
