import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagchannelComponent } from './tagchannel.component';
import {AppModule} from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';

describe('TagchannelComponent', () => {
  let component: TagchannelComponent;
  let fixture: ComponentFixture<TagchannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagchannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
