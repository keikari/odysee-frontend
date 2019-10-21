import {DeviceNotification} from '../../../device-notification/model/device-notification';

export class SQLTemplate {
  ID: bigint | number = 0;
  public Name: string;
  IgnoreRules:  boolean;
  SendOnce:     boolean;
  RunPeriodHrs: bigint | number = 0;
  UserQuery:    string;
  StartsOn:     Date;
  ExpiresOn:    Date;
  Description:  string;
  Tags: string[] = [];
  TagsJoined: string;
  Subject: string;
  Template: string;
  DeviceNotification: DeviceNotification;
  CreatedBy: number;

  constructor(name: string) {
    this.Name = name;
  }
}
