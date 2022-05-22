import { Lease } from "./lease";
import { ModelBase } from "./model-base";

export class CashFlow extends ModelBase {
    lease?: string;
    lease_obj?: Lease;
    due_date?: Date;
    cash_flow?: number;
    mr_balance?: number;
    description?: string;
}