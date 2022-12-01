import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AppService} from "../app.service";
import {Dropdown} from "./dropdown";

@Component({
  selector: 'mvp-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropdownComponent)
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() id: string = AppService.uuid();
  @Input() data: Array<Dropdown> = [];
  onChange = (value: any | null) => {};
  hidden = true;
  selectedItem?: Dropdown | null;
  displayLabel = '';
  @Input() placeholder = '';
  displayValue: any;
  constructor() {
  }

  writeValue(obj: any): void {
    this.selectedItem = this.data.find(u => u.id === obj);
  }

  ngOnInit(): void {

  }

  selectItem(item: Dropdown) {
    this.selectedItem = item;
    this.displayLabel = this.selectedItem.name;
    this.displayValue = this.selectedItem.id;
    this.onChange(item.id);
  }

  registerOnChange(fn: (value: any | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  ngAfterViewInit(): void {
    document.getElementById(this.id)?.addEventListener('click', () => {
      const ele = document.getElementsByClassName(' mvp-droplist-container');
      for (let i = 0; i< ele.length;i++) {
        if (!ele.item(i)?.classList.contains('hidden')) {
          ele.item(i)?.classList.add('hidden')
        }
      }
      document.getElementsByClassName(this.id).item(0)?.classList.remove('hidden');
    })
  }
}
