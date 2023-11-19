import {Component} from "@angular/core";
import {SearchService} from "../search.service";

@Component({
  standalone: true,
  selector: 'app-lotr',
  template: `
    <div>Found: ( {{ searchService.item() }} )</div>
    <div>SearchString: ( {{ searchService.searchString() }} )</div>
    <div><input type="text" (input)="onInput($event.target)"></div>
  `
})
export class LotrComponent {
  constructor(public searchService: SearchService) {
  }

  onInput(el: any) {
    this.searchService.setSearch(el.value);
  }
}
