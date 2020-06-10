import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {MessageService} from 'primeng/api';
import {CountryCode} from './model/country-code';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-country-codes',
  templateUrl: './country-codes.component.html',
  styleUrls: ['./country-codes.component.css']
})
export class CountryCodesComponent implements OnInit {
  CountryCodes: CountryCode[] = [];
  selectedCode: CountryCode;
  doubleSelectedCode: CountryCode;
  code: CountryCode;
  newCode: boolean;
  displayCodeDialog: boolean;
  codeCols = [
    {field: 'GreyListed', header: 'GreyListed', width: '13px'},
    {field: 'ID', header: 'ID', width: '30px'},
    {field: 'Code', header: 'Code', width: '30px'},
    {field: 'Description', header: 'Description', width: '50px'},
    {field: 'AddedByID', header: 'AddedByID', width: '50px'},
    {field: 'ExpiresAt', header: 'ExpiresAt', width: '90px'},
    {field: 'Comment', header: 'Comment', width: '150px'}];

  constructor(public rest: ApiService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadCountryCodes();
  }

  private loadCountryCodes() {
    this.CountryCodes = [];
    this.rest.get('administrative', 'country_codes/', new HttpParams()).subscribe((catResponse) => {
      catResponse.data.forEach((c) => {

        const code = new CountryCode();
        code.ID = c.id;
        code.GreyListed = c.grey_listed;
        code.Code = c.code;
        code.AddedByID = c.added_by_id;
        code.Description = c.description;
        code.Comment = c.comment;
        code.ExpiresAt = c.expires_at ? new Date(c.expires_at) : null;
        this.CountryCodes = this.CountryCodes.concat(code);
        this.selectedCode = this.CountryCodes[0];
      });
    });

  }

  public onCodeRowSelect($event: any) {
    if ( this.doubleSelectedCode === this.selectedCode) {
      this.newCode = false;
      const code = {};
      for (const prop in this.selectedCode) {
        code[prop] = this.selectedCode[prop];
      }
      this.code = <CountryCode> code;
      this.displayCodeDialog = true;
    } else {
      this.doubleSelectedCode = this.selectedCode;
    }
  }

  public showDialogToAddCode() {
    this.newCode = true;
    this.code = new CountryCode();
    this.displayCodeDialog = true;
  }

  deleteCountryCode() {
    this.rest.delete('administrative', 'country_codes/' + this.code.Code, new HttpParams())
      .subscribe((response) => {
        if ( response && response.success) {
          const newCodes = [];
          this.CountryCodes.forEach((c) => {
              if ( c.Code !== this.code.Code) {
                newCodes.push(c);
              }
          });
          this.CountryCodes = newCodes;
          this.displayCodeDialog = false;
        } else if ( response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Delete Country Code', detail: response.error});
        }
      });
  }

  saveCountryCode() {
    this.code.GreyListed = this.code.GreyListed && this.code.GreyListed !== null ? this.code.GreyListed : false;
    this.code.ExpiresAt = this.code.ExpiresAt && this.code.ExpiresAt !== null ? this.code.ExpiresAt : null;
    this.code.Comment = this.code.Comment && this.code.Comment !== null ? this.code.Comment : '';
    this.code.Description = this.code.Description && this.code.Description !== null ? this.code.Description : '';
    const params = new HttpParams().
    set('grey_listed', this.code.GreyListed.toString()).
    set('description', this.code.Description).
    set('comment', this.code.Comment).
    set('expires_on', this.code.ExpiresAt !== null ? this.code.ExpiresAt.toISOString() : '');
    if (this.newCode) {
      this.rest.post('administrative', 'country_codes/' + this.code.Code, params).subscribe( (response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'New Country Code', detail: response.error});
        } else {
          this.code.AddedByID = response.data.added_by_id;
          this.code.ID = response.data.id;
          this.CountryCodes = this.CountryCodes.concat(this.code)
          this.displayCodeDialog = false;
        }
      });
    } else {
      this.rest.put('administrative', 'country_codes/' + this.selectedCode.Code, params ).
      subscribe( (response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Edit Country Code', detail: response.error});
        } else {
          const newCodes = [];
          this.CountryCodes.forEach((c) => {
            if ( c.Code === this.code.Code) {
              this.code.AddedByID = response.data.added_by_id;
              console.log(response);
              this.code.ID = response.data.id;
              newCodes.push(this.code);
            } else {
              newCodes.push(c);
            }
          });
          this.CountryCodes = newCodes;
          this.displayCodeDialog = false;
        }
      });
    }
  }
}
