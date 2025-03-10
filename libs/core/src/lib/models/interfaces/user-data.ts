import { IndustryEnum, RoleEnum } from '@core/models/enums';


export interface IUserData {
  aboutUs: string;
  industry: IndustryEnum;
  experienceInYear: number;
  yourRole: RoleEnum;
  email: string;
  password: string;
}
