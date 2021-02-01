import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  play(fileName: string) {
    // console.log(fileName)
    let audio = new Audio();
    audio.src = `../../../assets/audio/${fileName}.mp3`;
    audio.load();
    audio.play();
  }
}
