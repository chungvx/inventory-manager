import { StringIterator } from "lodash";

export type AccountResponse = {
  id?: number;
  fullName: number;
  accountOwner?: boolean;
  authorities: string[];
  roles?: RolesResponse[];
  email?: string;
};

export type RolesResponse = {
  accountId: number;
  code: string;
  createdOn: Date;
  locationId: number;
  modifiedOn: Date;
  name: string;
  roleId: number;
}