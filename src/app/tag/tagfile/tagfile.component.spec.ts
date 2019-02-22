import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagfileComponent } from './tagfile.component';
import {AppModule} from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';

describe('TagfileComponent', () => {
  let component: TagfileComponent;
  let fixture: ComponentFixture<TagfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
