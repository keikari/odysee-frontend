import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {MessageService} from 'primeng/api';
import {HttpClientModule, HttpParams} from '@angular/common/http';
import { Category } from './category';
import { File } from './file';
import {getResponseURL} from '@angular/http/src/http_utils';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  Categories: Category[] = [];
  selectedCategory: Category;
  doubleSelectedCategory: Category;
  selectedFile: File;
  categoryCols = [{field: 'IsActive', header: 'IsActive', width: '13px'},
                  {field: 'Name', header: 'Name', width: '30px'},
                  {field: 'Channel', header: 'Channel', width: '60px'}];
  fileCols = [{field: 'IsFeatured', header: '', width: '13px'},
              {field: 'Start', header: 'Start', width: '35px'},
              {field: 'End', header: 'End', width: '35px'},
              {field: 'URL', header: 'URL', width: '75px'}];
  displayCategoryDialog: boolean;
  displayFileDialog: boolean;
  newCategory: boolean;
  newFile: boolean;
  category: Category;
  file: File;

  constructor(public rest: RestService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.Categories = [];
    this.rest.get('featured_category', 'list', new HttpParams()).subscribe((catResponse) => {
      catResponse.data.forEach((cat) => {

        const category = new Category();
        category.ID = cat.id;
        category.Name = cat.category_name;
        category.Channel = cat.channel;
        category.IsActive = cat.is_active;
        category.SequenceNr = cat.sequence_number;
        this.loadFilesForCategory(category);
        this.Categories = this.Categories.concat(category);
        this.selectedCategory = this.Categories[0];
      });
    });
  }

  private loadFilesForCategory(category: Category) {
    category.Files = [];
    const params = new HttpParams().
    set('category_id', category.ID.toString());
    this.rest.get('featured_file', 'list', params).subscribe((fileResponse) => {
      if ( fileResponse.data) {
        fileResponse.data.forEach((f) => {
          const file = new File();
          file.ID = f.id;
          file.URL = f.url;
          file.Start = new Date(f.start);
          file.End = new Date(f.end);
          file.IsFeatured = f.is_featured;
          file.SequenceNr = f.sequence_number;
          category.Files.push(file);
        });
      }
    });
  }

  saveCategory() {
    let params = new HttpParams().
    set('name', this.category.Name).
    set('is_active', this.category.IsActive.toString()).
    set('sequence_number', this.category.SequenceNr.toString());
    if (this.category.Channel && this.category.Channel !== '') {
      params = params.set('channel', this.category.Channel);
    }
    if (this.newCategory) {
      this.rest.get('featured_category', 'new', params).subscribe((response) => {
        if (response && response.data) {
          this.loadCategories();
          this.displayCategoryDialog = false;
          this.newCategory = false;
        } else if ( response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Adding New Category', detail: response.error});
        }
      });
    } else {
      this.rest.get('featured_category', 'edit', params.set('id', this.category.ID.toString())).
      subscribe( (response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Editing Category', detail: response.error});
        } else {
          this.loadCategories();
          this.displayCategoryDialog = false;
        }
      });
    }
  }

  private deleteCategory() {
    const params = new HttpParams().set('id', this.selectedCategory.ID.toString());
    this.rest.get('featured_category', 'delete', params).subscribe((response) => {
      if ( response && response.data) {
        this.loadCategories();
        this.displayCategoryDialog = false;
      } else if ( response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Delete Category', detail: response.error});
      }
    });
  }

  private saveFile() {
    const params = new HttpParams().
    set('category_id', this.selectedCategory.ID.toString()).
    set('url', this.file.URL).
    set('start', this.file.Start.toISOString()).
    set('end', this.file.End.toISOString()).
    set('sequence_number', this.file.SequenceNr.toString());
    if (this.newFile) {
      this.rest.get('featured_file', 'new', params).subscribe( (response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'New File', detail: response.error});
        } else {
          this.loadFilesForCategory(this.selectedCategory);
          this.displayFileDialog = false;
        }
      });
    } else {
      this.rest.get('featured_file', 'edit', params.set('id', this.file.ID.toString())).
      subscribe( (response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Edit File', detail: response.error});
        } else {
          this.loadFilesForCategory(this.selectedCategory);
          this.displayFileDialog = false;
        }
      });
    }
  }

  private deleteFile() {
    const params = new HttpParams().set('id', this.file.ID.toString());
    this.rest.get('featured_file', 'delete', params).subscribe((response) => {
      if ( response && response.data) {
        this.loadFilesForCategory(this.selectedCategory);
        this.displayFileDialog = false;
      } else if ( response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Delete File', detail: response.error});
      }
    });
  }

  showDialogToAddCategory() {
    this.newCategory = true;
    this.category = new Category();
    this.category.SequenceNr = 1 + this.Categories.
      reduce((max, p) => p.SequenceNr > max ? p.SequenceNr : max, this.Categories[0].SequenceNr);
    this.displayCategoryDialog = true;
  }

  showDialogToAddFile() {
    this.newFile = true;
    this.file = new File();
    this.file.SequenceNr = 1 + this.selectedCategory.Files.
      reduce((max, p) => p.SequenceNr > max ? p.SequenceNr : max, this.selectedCategory.Files[0].SequenceNr);
    this.file.End.setDate(this.file.Start.getDate() + 7);
    console.log('start', this.file.Start, 'end', this.file.End);
    this.displayFileDialog = true;
  }

  onCategoryRowSelect($event: any) {
    if ( this.doubleSelectedCategory === this.selectedCategory) {
      this.newCategory = false;
      const category = {}
      for (const prop in this.selectedCategory) {
        category[prop] = this.selectedCategory[prop];
      }
      this.category = <Category> category;
      this.displayCategoryDialog = true;
    } else {
      this.doubleSelectedCategory = this.selectedCategory;
    }
  }

  onFileRowSelect($event: any) {
    this.newFile =  false;
    const file = {}
    for (const prop in this.selectedFile) {
      file[prop] = this.selectedFile[prop];
    }
    this.file = <File> file;
    this.displayFileDialog = true;
  }

  onCategoryRowUnSelect($event: any) {
    this.selectedCategory = <Category> $event.data;
    this.messageService.clear();
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'deselected category'});
  }
}
