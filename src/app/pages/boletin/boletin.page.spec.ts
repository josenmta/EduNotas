import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletinPage } from './boletin.page';

describe('BoletinPage', () => {
  let component: BoletinPage;
  let fixture: ComponentFixture<BoletinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
