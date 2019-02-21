import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardCodeComponent } from './reward-code.component';
import {AppModule} from '../app.module';
import {APP_BASE_HREF} from '@angular/common';

describe('RewardCodeComponent', () => {
  let component: RewardCodeComponent;
  let fixture: ComponentFixture<RewardCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
