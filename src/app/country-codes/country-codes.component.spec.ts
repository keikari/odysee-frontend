import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCodesComponent } from './country-codes.component';
import {AppModule} from '../app.module';
import {APP_BASE_HREF} from '@angular/common';

describe('CountryCodesComponent', () => {
  let component: CountryCodesComponent;
  let fixture: ComponentFixture<CountryCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
