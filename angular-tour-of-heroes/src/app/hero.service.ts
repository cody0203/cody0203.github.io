import { Injectable } from "@angular/core";
import Hero from "./Hero";
import { HEROES } from "./mocks-heroes";
import { Observable, of } from "rxjs";

import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    this.messageService.add("HeroService: fetched heroes");
    return of(HEROES);
  }

  getHero(id): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
