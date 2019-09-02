import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticulierPage } from './particulier.page';

describe('ParticulierPage', () => {
  let component: ParticulierPage;
  let fixture: ComponentFixture<ParticulierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticulierPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticulierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
