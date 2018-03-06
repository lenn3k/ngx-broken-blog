import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardIndexPageComponent } from './board-index-page.component';

describe('BoardIndexPageComponent', () => {
  let component: BoardIndexPageComponent;
  let fixture: ComponentFixture<BoardIndexPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardIndexPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
