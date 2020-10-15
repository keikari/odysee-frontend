import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelFactorComponent } from './channel-factor.component';

describe('ChannelFactorComponent', () => {
  let component: ChannelFactorComponent;
  let fixture: ComponentFixture<ChannelFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
