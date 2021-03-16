import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  play(fileName: string) {
    let audio = new Audio();
    audio.src = `../../../assets/audio/${fileName}.mp3`;
    audio.load();
    audio.play();
  }
}
