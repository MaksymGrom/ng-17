import {computed, effect, Injectable, Signal, signal} from "@angular/core";

const debounce = <T>(source: Signal<T>, time: number) => {
  const res = signal<T>(source());

  effect((onCleanup) => {
    const value = source();
    const timeoutId = setTimeout(() => {
      res.set(value);
    }, time);

    onCleanup(() => {
      clearTimeout(timeoutId);
    });
  });

  return res.asReadonly();
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private list = ['Gendalf', 'Aragorn', 'Boromir', 'Frodo', 'Sam'];

  private _searchString = signal('');
  searchString = debounce(this._searchString.asReadonly(), 500);

  item = computed(() => {
    console.log('item works');
    if (!this.searchString()) {
      return '';
    }

    return this.list.find(i => i.toLowerCase().includes(
      this.searchString().toLowerCase()
    )) || '';
  })

  setSearch(str: string) {
    this._searchString.set(str.trim());
  }
}
