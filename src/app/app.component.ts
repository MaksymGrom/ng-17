import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {LotrComponent} from "./components/lotr.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LotrComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _counter = signal(0);
  private _counter$ = new BehaviorSubject(0);

  counter = this._counter.asReadonly();
  counter$ = this._counter$.asObservable();

  multiplier = signal(1);

  result = computed(() => {
    // ===
    console.log(this.multiplier());
    return this.counter() * this.multiplier();
  });
  up() {
    this._counter.set(this.counter() + 1);
  }

  down() {
    this._counter.set(this.counter() - 1);
  }


  up$() {
    this._counter$.next(this._counter$.value + 1);
  }

  down$() {
    this._counter$.next(this._counter$.value - 1);
  }
}
