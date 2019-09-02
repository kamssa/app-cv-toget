import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaCollectionPage } from './ma-collection.page';

describe('MaCollectionPage', () => {
  let component: MaCollectionPage;
  let fixture: ComponentFixture<MaCollectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaCollectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
