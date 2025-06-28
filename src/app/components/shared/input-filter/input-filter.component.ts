import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-input-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss'],
})
export class InputFilterComponent {
  @Output() filterChange = new EventEmitter<string>();

  private inputSubject = new Subject<string>();

  constructor() {
    this.inputSubject.pipe(debounceTime(300)).subscribe((value) => {
      this.filterChange.emit(value.trim().toLowerCase());
    });
  }

  onInputChange(value: any) {
    const finalValue = String(value ?? '')
      .trim()
      .toLowerCase();
    this.inputSubject.next(finalValue);
  }
}
