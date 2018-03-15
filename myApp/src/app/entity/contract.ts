import { ServiceType } from './servicetype';
export class Contract {
    idContract: number;
    idShoppingCart: number;
    idUserHired: number;
    hoursHired : number;
    placeMeeting: string;
    refPlaceMeeting: string;
    dateMeeting: Date;
    price: number;
    serviceType: ServiceType;
    status: string;
    constructor(idUserHired) {
        this.idUserHired = idUserHired;
        this.status = "PET";
    }

}