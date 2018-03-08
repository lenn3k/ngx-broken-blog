import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTopicPageComponent } from './topic-edit-page.component';

describe('NewTopicPageComponent', () => {
  let component: NewTopicPageComponent;
  let fixture: ComponentFixture<NewTopicPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTopicPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTopicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
