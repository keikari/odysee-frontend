export class DeviceNotification {
  ID:         bigint | number = 0;
  Name:       string;
  Title:      string;
  Text:       string;
  ImageURL:   string;
  Type:       string;
  Target:     string;
  Device:     string;
  AddedByID:  bigint | number = 0;
  ExpiresAt:  Date;
}


