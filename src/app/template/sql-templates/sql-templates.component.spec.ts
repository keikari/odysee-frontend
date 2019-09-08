import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SqlTemplatesComponent } from './sql-templates.component';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from '../../app.module';

describe('SqlTemplatesComponent', () => {
  let component: SqlTemplatesComponent;
  let fixture: ComponentFixture<SqlTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
