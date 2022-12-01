import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AppService} from "../app.service";

@Component({
  selector: 'mvp-date-drop',
  templateUrl: './date-comp.component.html',
  styleUrls: ['./date-comp.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateCompComponent)
    }
  ]
})
export class DateCompComponent implements OnInit {
  @Input() id: string = AppService.uuid();
  onChange = (value: string | null) => {};
  hidden = true;
  selectedDate?: string | null;
  displayLabel = '';
  @Input() placeholder = '';
  constructor() {
  }

  writeValue(obj: string): void {
    this.selectedDate = obj;
  }

  ngOnInit(): void {

  }

  selectItem(item: string) {
    this.selectedDate = item;
    this.displayLabel = this.selectedDate;
    this.onChange(item);
  }

  registerOnChange(fn: (value: string | null) => void): void {
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
