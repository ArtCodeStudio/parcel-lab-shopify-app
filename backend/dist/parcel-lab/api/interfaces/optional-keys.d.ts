export interface ParcellabOptionalKeys {
    deliveryNo: string;
    customerNo: string;
    weight: string;
    courierServiceLevel: string;
    warehouse: string;
    market: string;
    complete: boolean;
    upgrade: boolean;
    cashOnDelivery: number;
    branchDelivery: boolean;
    statuslink: string;
    order_date: Date | number;
    send_date: Date | number;
    announced_delivery_date: Date;
}
