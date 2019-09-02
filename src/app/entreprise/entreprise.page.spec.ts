import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisePage } from './entreprise.page';

describe('EntreprisePage', () => {
  let component: EntreprisePage;
  let fixture: ComponentFixture<EntreprisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntreprisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreprisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
