import { Component, OnInit } from "@angular/core";
import { HEROES } from "../mocks-heroes";
import Hero from "../Hero";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes = HEROES;
  selectedHero: Hero;
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
  resetClasses = "resetClasses";
  bgWhite = "bgWhite";
  constructor() {}

  ngOnInit() {}
}
