export interface iLead { 
    version: string;
    title: string
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: Date;
    id?: number; //Returned once created
  }


  export interface iClaim { 
      leadId:number
      clientApiResponse?: boolean
  }
  
export interface iUtm {
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmContent: string;
    leadId?: number;
    partialId?: number;

}

export interface iAddress { 
    addressLineOne: string;
    addressLineTwo?:string;
    addressLineThree?:string;
    city: string;
    postcode: string;
    leadId?: number;
    partialId?: number;

}  
  
export interface iClaimerData { 
    os: any;
    device: any;
    client: any;
    ip: any;
    city: any;
    country: string;
    leadId?: number;
    partialId?: number;

}  
  
   