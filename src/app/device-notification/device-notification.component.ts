import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest.service';
import {MessageService} from 'primeng/api';
import {DeviceNotification} from './model/device-notification';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-device-notification',
  templateUrl: './device-notification.component.html',
  styleUrls: ['./device-notification.component.css']
})
export class DeviceNotificationComponent implements OnInit {
  deviceNotifications: DeviceNotification[] = [];
  selectedDeviceNotification: DeviceNotification;
  doubleSelectedDeviceNotification: DeviceNotification;
  deviceNotification: DeviceNotification;
  deviceOptions = [{label: 'Mobile', value: 'Mobile'}, {label: 'Desktop', value: 'Desktop'}];
  newDeviceNotification: boolean;
  displayDeviceNotificationDialog: boolean;
  deviceNotificationCols = [
    {field: 'ID', header: 'ID', width: '30px'},
    {field: 'Name', header: 'Name', width: '30px'},
    {field: 'Device', header: 'Device Type', width: '50px'},
    {field: 'Title', header: 'Title', width: '50px'},
    {field: 'Text', header: 'Text', width: '50px'},
    {field: 'ExpiresAt', header: 'ExpiresAt', width: '90px'}];

  constructor(public rest: RestService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadDeviceNotifications();
  }

  private loadDeviceNotifications() {
    this.deviceNotifications = [];
    this.rest.get('template', 'notification/', new HttpParams()).subscribe((catResponse) => {
      catResponse.data.forEach((c) => {

        const deviceNotification = new DeviceNotification();
        deviceNotification.ID = c.id;
        deviceNotification.Name = c.name;
        deviceNotification.Title = c.title;
        deviceNotification.Text = c.text;
        deviceNotification.ImageURL = c.image_url;
        deviceNotification.Type = c.type;
        deviceNotification.Device = c.device;
        deviceNotification.Target = c.target;
        deviceNotification.AddedByID = c.added_by_id;
        deviceNotification.ExpiresAt = c.expires_at ? new Date(c.expires_at) : null;
        this.deviceNotifications = this.deviceNotifications.concat(deviceNotification);
        this.selectedDeviceNotification = this.deviceNotifications[0];
      });
    });
  }

  onDeviceNotificationRowSelect($event: any) {
    if ( this.doubleSelectedDeviceNotification === this.selectedDeviceNotification) {
      this.newDeviceNotification = false;
      const deviceNotification = {};
      // tslint:disable-next-line:forin
      for (const prop in this.selectedDeviceNotification) {
        deviceNotification[prop] = this.selectedDeviceNotification[prop];
      }
      this.deviceNotification = <DeviceNotification> deviceNotification;
      this.displayDeviceNotificationDialog = true;
    } else {
      this.doubleSelectedDeviceNotification = this.selectedDeviceNotification;
    }
  }

  showDialogToAddDeviceNotification() {
    this.newDeviceNotification = true;
    this.deviceNotification = new DeviceNotification();
    this.displayDeviceNotificationDialog = true;
  }

  deleteDeviceNotification() {
    this.rest.delete('template', 'notification/' + this.deviceNotification.Name, new HttpParams())
      .subscribe((response) => {
        if ( response && response.success) {
          const newDeviceNotifications = [];
          this.deviceNotifications.forEach((c) => {
            if ( c.Name !== this.deviceNotification.Name) {
              newDeviceNotifications.push(c);
            }
          });
          this.deviceNotifications = newDeviceNotifications;
          this.displayDeviceNotificationDialog = false;
        } else if ( response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Delete Device Notification', detail: response.error});
        }
      });
  }

  saveDeviceNotification() {
    const d = this.deviceNotification;
    d.Name = d.Name && d.Name !== null ? d.Name : '';
    d.Title = d.Title && d.Title !== null ? d.Title : '';
    d.ExpiresAt = d.ExpiresAt && d.ExpiresAt !== null ? d.ExpiresAt : null;
    d.Text = d.Text && d.Text !== null ? d.Text : '';
    d.ImageURL = d.ImageURL && d.ImageURL !== null ? d.ImageURL : '';
    d.Type = d.Type && d.Type !== null ? d.Type : '';
    d.Target = d.Target && d.Target !== null ? d.Target : '';
     const params = new HttpParams().
    set('title', d.Title.toString()).
    set('text', d.Text).
    set('image_url', d.ImageURL).
    set('type', d.Type).
    set('device', d.Device).
    set('target', d.Target).
    set('expires_at', d.ExpiresAt !== null ? d.ExpiresAt.toISOString() : '');
    if (this.newDeviceNotification) {
      this.rest.post('template', 'notification/' + d.Name, params).subscribe( (response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'New Device Notification', detail: response.error});
        } else {
          this.deviceNotification.AddedByID = response.data.added_by_id;
          this.deviceNotification.ID = response.data.id;
          this.deviceNotifications = this.deviceNotifications.concat(this.deviceNotification);
          this.displayDeviceNotificationDialog = false;
        }
      });
    } else {
      this.rest.put('template', 'notification/' + this.selectedDeviceNotification.Name, params ).
      subscribe( (response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Edit Device Notification', detail: response.error});
        } else {
          const newDeviceNotifications = [];
          this.deviceNotifications.forEach((c) => {
            if ( c.Name === this.deviceNotification.Name) {
              this.deviceNotification.AddedByID = response.data.added_by_id;
              console.log(response);
              this.deviceNotification.ID = response.data.id;
              newDeviceNotifications.push(this.deviceNotification);
            } else {
              newDeviceNotifications.push(c);
            }
          });
          this.deviceNotifications = newDeviceNotifications;
          this.displayDeviceNotificationDialog = false;
        }
      });
    }
  }
}
