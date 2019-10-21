import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceNotificationComponent } from './device-notification.component';

describe('DeviceNotificationComponent', () => {
  let component: DeviceNotificationComponent;
  let fixture: ComponentFixture<DeviceNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceNotificationComponent ]
    })
    .compileComponents();
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
