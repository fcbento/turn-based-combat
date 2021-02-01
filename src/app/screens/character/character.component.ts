import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() character;
  @Input() player;
  @Output() selectedChar = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
   
  }

  selectChar(char: Character) {
    char.player = this.player;
    char.selected = true;
    this.selectedChar.emit(char);
  }

}
