export interface IPayloadAddCompanyMember {
  fullname: string;
  imageUrl: string;
  position: string;
}

export interface IPayloadEditCompanyMember {
  fullname: string;
  imageUrl: string;
  position: string;
  uuid: string;
}
