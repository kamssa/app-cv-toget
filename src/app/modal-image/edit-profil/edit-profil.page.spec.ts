import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilPage } from './edit-profil.page';

describe('EditProfilPage', () => {
  let component: EditProfilPage;
  let fixture: ComponentFixture<EditProfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
