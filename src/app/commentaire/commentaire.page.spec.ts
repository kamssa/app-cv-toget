import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentairePage } from './commentaire.page';

describe('CommentairePage', () => {
  let component: CommentairePage;
  let fixture: ComponentFixture<CommentairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentairePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
