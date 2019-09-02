import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APropsPage } from './a-props.page';

describe('APropsPage', () => {
  let component: APropsPage;
  let fixture: ComponentFixture<APropsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APropsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APropsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
