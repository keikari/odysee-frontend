import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagfileComponent } from './tagfile.component';

describe('TagfileComponent', () => {
  let component: TagfileComponent;
  let fixture: ComponentFixture<TagfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagfileComponent ]
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
