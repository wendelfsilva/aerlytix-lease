import {Directive, Input, OnInit} from "@angular/core";
import {NgControl} from "@angular/forms";
import {MatDatepickerInput} from "@angular/material/datepicker";
import * as moment from "moment";

@Directive({
    selector: "input[dateFormat]",
})
export class DateFormatDirective implements OnInit {

    @Input() dateFormat = "YYYY-MM-DDTHH:mm:ssZ";

    constructor(public _control: NgControl,
                public _date: MatDatepickerInput<Date>) {
    }

    public ngOnInit() {
        this._date.dateChange.subscribe(element => {
            const date = element.value;
            if (date) {
                const dateStr = moment(date, "YYYY-MM-DDTHH:mm").format(this.dateFormat);
                this._control.control?.setValue(dateStr);
            } else {
                this._control.control?.reset();
            }
        });
    }
}
