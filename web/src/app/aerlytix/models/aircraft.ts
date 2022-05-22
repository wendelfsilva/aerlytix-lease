import { ModelBase } from "./model-base";

export class Aircraft extends ModelBase {
    description?: string;
    valuation_date?: Date;
    appraised_value?: number;
    depreciation_rate?: number;
    initial_used_life?: number;
    check_interval?: number;
    min_check_cost?: number;
    max_check_cost?: number;
}