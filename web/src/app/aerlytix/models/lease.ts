import { Aircraft } from "./aircraft";
import { ModelBase } from "./model-base";

export class Lease extends ModelBase {
    aircraft?: string;
    aircraft_obj?: Aircraft;
    economic_closing_date?: Date;
    net_price?: number;
    star_date?: Date;
    end_date?: Date;
    monthly_rent?: number;
    monthly_mr_rent?: number;
}