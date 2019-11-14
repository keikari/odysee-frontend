import {Component, OnInit} from '@angular/core';
import {SQLTemplate} from './model/sqltemplate';
import {HttpParams} from '@angular/common/http';
import {RestService} from '../../rest.service';
import {MessageService} from 'primeng/api';
import {isArray} from 'util';
import {DeviceNotification} from '../../device-notification/model/device-notification';
import {DeviceNotificationComponent} from '../../device-notification/device-notification.component';

@Component({
  selector: 'app-sql-templates',
  templateUrl: './sql-templates.component.html',
  styleUrls: ['./sql-templates.component.css']
})
export class SqlTemplatesComponent implements OnInit {
  templates: SQLTemplate[] = [];
  deviceNotifications: DeviceNotification[] = [];
  selectedTemplate: SQLTemplate;
  newTemplate: boolean;
  isNew: boolean;
  isBlocked: boolean;

  constructor(public rest: RestService, private messageService: MessageService) { }
  ngOnInit() {
    this.loadDeviceNotificationOptions();
    this.loadSQLTemplates();
  }

  private loadDeviceNotificationOptions() {
    this.deviceNotifications = [];
    this.rest.get('template', 'notification/', new HttpParams()).subscribe((catResponse) => {
      if (catResponse.data === null) {
        return;
      }
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
      });
    });
  }
  private loadSQLTemplates() {
    this.selectedTemplate = new SQLTemplate('new template');
    this.templates = [];
    this.rest.get('template', 'sql/', new HttpParams()).subscribe((templateResponse) => {
      if (templateResponse.data) {
        if (isArray(templateResponse.data)) {
          templateResponse.data.forEach((c) => {
            const template = this.createSQLTemplate(c);
            this.templates = this.templates.concat(template);
            if (this.templates.length > 0) {
              this.selectedTemplate = this.templates[0];
            }
          });
        } else {
          const template = this.createSQLTemplate(templateResponse.data);
          this.templates = this.templates.concat(template);
          if (this.templates.length > 0) {
            this.selectedTemplate = this.templates[0];
          }
        }
      }
    });
  }

  private createSQLTemplate(c: any): SQLTemplate {

    const template = new SQLTemplate('new template');
    template.ID = c.id;
    template.Name = c.name;
    template.Description = c.description;
    template.UserQuery = c.user_query;
    template.Template = c.template;
    template.SendOnce = c.send_once;
    template.IgnoreRules = c.ignore_rules;
    template.RunPeriodHrs = c.run_period_hrs;
    template.CreatedBy = c.added_by_id;
    template.TagsJoined = c.tags;
    template.Subject = c.subject;
    template.ExpiresOn = c.expires_at ? new Date(c.expires_at) : null;
    template.StartsOn = c.starts_at ? new Date(c.starts_at) : null;
    if (template.TagsJoined && template.TagsJoined != null) {
      template.Tags = template.TagsJoined.split(',');
    }
    if (c.device_notification_id && this.deviceNotifications.length > 0) {
      this.deviceNotifications.forEach(deviceNotification => {
        if (deviceNotification.ID === c.device_notification_id) {
          template.DeviceNotification = deviceNotification;
        }
      });
    }

    return template;
}

  newSQLTemplate() {
    const newTemplate = new SQLTemplate('');
    this.selectedTemplate = newTemplate;
    this.isNew = true;
  }

  deleteSQLTemplate() {
    this.rest.delete('template', 'sql/' + this.selectedTemplate.Name, new HttpParams())
      .subscribe((response) => {
        if ( response && response.success) {
          const newTemplates = [];
          this.templates.forEach((c) => {
            if ( c.Name !== this.selectedTemplate.Name) {
              newTemplates.push(c);
            }
            this.messageService.clear();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'template deleted'});
          });
          this.templates = newTemplates;
        } else if ( response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Delete SQL Template', detail: response.error});
        }
      });
  }

  saveSQLTemplate() {
    const ignoreRules = this.selectedTemplate.IgnoreRules;
    const exipresOn = this.selectedTemplate.ExpiresOn;
    const startsOn = this.selectedTemplate.StartsOn;
    const description = this.selectedTemplate.Description;
    const userQuery = this.selectedTemplate.UserQuery;
    const sendOnce = this.selectedTemplate.SendOnce;
    const runPeriodHrs = this.selectedTemplate.RunPeriodHrs;
    const tags  = this.selectedTemplate.Tags;
    const subject = this.selectedTemplate.Subject;
    const deviceNotification = this.selectedTemplate.DeviceNotification;

    this.selectedTemplate.SendOnce = sendOnce && sendOnce !== null ? sendOnce : false;
    this.selectedTemplate.IgnoreRules = ignoreRules && ignoreRules !== null ? ignoreRules : false;
    this.selectedTemplate.ExpiresOn = exipresOn && exipresOn !== null ? exipresOn : null;
    this.selectedTemplate.StartsOn = startsOn && startsOn !== null ? startsOn : null;
    this.selectedTemplate.UserQuery = userQuery && userQuery !== null ? userQuery : '';
    this.selectedTemplate.Description = description && description !== null ? description : '';
    this.selectedTemplate.RunPeriodHrs = runPeriodHrs && runPeriodHrs !== null ? runPeriodHrs : 0;
    this.selectedTemplate.TagsJoined = tags && tags !== null ? tags.join(',') : null;
    this.selectedTemplate.Subject = subject && subject !== null ? subject : '';

    const params = new HttpParams().
    set('template', this.selectedTemplate.Template).
    set('ignore_rules', this.selectedTemplate.IgnoreRules.toString()).
    set('send_once', this.selectedTemplate.SendOnce.toString()).
    set('run_period_hrs', this.selectedTemplate.RunPeriodHrs.toString()).
    set('description', this.selectedTemplate.Description).
    set('user_query', this.selectedTemplate.UserQuery).
    set('subject', this.selectedTemplate.Subject).
    set('expires_on', this.selectedTemplate.ExpiresOn !== null ? this.selectedTemplate.ExpiresOn.toISOString() : '').
    set('tags', this.selectedTemplate.TagsJoined).
    set('device_notification', deviceNotification !== null && deviceNotification ? deviceNotification.ID.toString() : '0').
    set('starts_on', this.selectedTemplate.StartsOn !== null ? this.selectedTemplate.StartsOn.toISOString() : '');
    if (this.selectedTemplate.ID === 0) {
      this.rest.post('template', 'sql/' + this.selectedTemplate.Name, params).subscribe( (response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'New SQL Template', detail: response.error});
        } else {
          this.selectedTemplate.ID = response.data.id;
          this.selectedTemplate.CreatedBy = response.data.added_by_id;
          this.templates = this.templates.concat(this.selectedTemplate);
          this.isNew = false;
          this.messageService.clear();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'template created'});
        }
      });
    } else {
      this.rest.put('template', 'sql/' + this.selectedTemplate.Name, params ).
      subscribe( (response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Edit SQL Template', detail: response.error});
        } else {
          const newCodes = [];
          this.templates.forEach((c) => {
            if ( c.Name === this.selectedTemplate.Name) {
              console.log(response);
              this.selectedTemplate.ID = response.data.id;
              newCodes.push(this.selectedTemplate);
            } else {
              newCodes.push(c);
            }
          });
          this.templates = newCodes;
          this.messageService.clear();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'template saved'});
        }
      });
    }
  }

  validateSQLQuery() {
    this.isBlocked = true;
    this.rest.post('template', 'validate/' + this.selectedTemplate.Name, new HttpParams())
      .subscribe((response) => {
        if ( response && response.success) {
          this.isBlocked = false;
          this.messageService.clear();
          this.messageService.add({severity: 'success', summary: 'Success', detail: `template validated, will go to ${response.data.nr_users} users`});
        } else if ( response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'SQL Template Validation:', detail: response.error});
        }
        this.isBlocked = false;
      });
  }

  sendSQLTemplateNow() {
    this.isBlocked = true;
    this.rest.post('template', 'sql_send/' + this.selectedTemplate.Name, new HttpParams())
      .subscribe((response) => {
        if ( response && response.success) {
          this.isBlocked = false;
          this.messageService.clear();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'template sent'});
        } else if ( response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'SQL Template Sending:', detail: response.error});
        }
        this.isBlocked = false;
      });
  }
}




