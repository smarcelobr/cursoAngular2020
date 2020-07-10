import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Input()
  label = '';

  @Output()
  search = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(term: string) {
    this.search.emit(term);
  }
}
