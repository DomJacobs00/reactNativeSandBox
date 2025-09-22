export interface Employee  {
    title: string,
    name : string,
    lastName:string,
    mobile:string,
    address:string,
    postcode:string
}
export interface Invoice {
    id?: number,
    date: string,
    employee?: Employee,
    labourItems: LabourItem[],
    subtotal:number,
    lessCis: number,
    totalDue: number

}

export interface LabourItem {
    id?: number,
    taxFree?:boolean,
    date?:string,
    siteLocation?:string,
    description:string,
    qty:string,
    rate:string,
    amount:number

}