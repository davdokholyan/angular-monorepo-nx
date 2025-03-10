import { IndustryEnum } from '../enums/industry.enum';
import { RoleEnum } from '../enums/role.enum';

export interface IStep1Data {
  email: string;
  password: string;
}

export interface IStep2Data {
  industry: IndustryEnum;
  experienceInYear: number;
  yourRole: RoleEnum;
}

export interface IStep3Data {
  aboutUs: string;
}
