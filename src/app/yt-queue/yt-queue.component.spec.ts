import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YtQueueComponent } from './yt-queue.component';

describe('YtQueueComponent', () => {
  let component: YtQueueComponent;
  let fixture: ComponentFixture<YtQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YtQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YtQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
