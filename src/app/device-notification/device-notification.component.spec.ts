import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceNotificationComponent } from './device-notification.component';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from '../app.module';

describe('DeviceNotificationComponent', () => {
  let component: DeviceNotificationComponent;
  let fixture: ComponentFixture<DeviceNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
