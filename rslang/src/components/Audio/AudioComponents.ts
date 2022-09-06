import { IWord } from "../../services/Types/Types";

export class AudioComponents {
  isPause: boolean = false;
  drawAudioIcon(isPlay: boolean = this.isPause): string {
    let audioHTML: string = "";
    if (isPlay) {
      audioHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 500 500" xml:space="preserve">
        <g transform="matrix(16.66 0 0 16.66 249.91 249.91)" id="f_QRGyjok5jqBx0L7xzBF"  >
          <path style="stroke: fill="#3636DB"; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill="#3636DB"; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -11.99997 -6.90881 C -11.99997 -9.72058 -9.72058 -11.999970000000001 -6.908809999999999 -11.999970000000001 L 6.90882 -11.999970000000001 L 6.90882 -11.999970000000001 C 8.25908 -11.999970000000001 9.554030000000001 -11.46358 10.50881 -10.50881 C 11.46359 -9.554030000000001 11.999970000000001 -8.25908 11.999970000000001 -6.90882 L 11.999970000000001 6.908809999999999 L 11.999970000000001 6.908809999999999 C 11.999970000000001 9.720579999999998 9.720580000000002 11.99997 6.908810000000001 11.99997 L -6.908819999999999 11.99997 L -6.908819999999999 11.99997 C -9.720589999999998 11.99997 -11.999979999999999 9.72058 -11.999979999999999 6.908809999999999 z" stroke-linecap="round" />
        </g>
      </svg>
      `;
    } else {
      audioHTML = `
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.94727 11.2993C4.8427 11.2993 3.94727 12.1948 3.94727 13.2993V16.7007C3.94727 17.8052 4.8427 18.7007 5.94727 18.7007H8.88148L15.0492 24.8684V5.13158L8.88148 11.2993H5.94727Z" fill="#3636DB"/>
        <path d="M17 23C21.4183 23 25 19.4183 25 15C25 10.5817 21.4183 7 17 7V8.99766C20.315 8.99766 23.0023 11.685 23.0023 15C23.0023 18.315 20.315 21.0023 17 21.0023V23Z" fill="#3636DB"/>
        <path d="M17 18.998C19.0823 18.932 20.75 17.2233 20.75 15.125C20.75 13.0267 19.0823 11.318 17 11.252V18.998Z" fill="#3636DB"/>
      </svg>
    `;
    }
    return audioHTML;
  }

  isAudioIconClick = (id: string, url: string, item: IWord) => {
    const audioEl = document.getElementById(id) as HTMLElement;
    const audioPlayer = document.querySelector(
      `#audio-${id}`
    ) as HTMLAudioElement;

    audioEl.addEventListener("click", () => {
      let queue = 0;
      this.stopAllAudio(audioEl, audioPlayer);
      if (this.isEnyonePlaying()) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioPlayer.src = `${url}/${item.audio}`;

        this.isPause = false;
        audioEl.innerHTML = this.drawAudioIcon();
      } else {
        void audioPlayer.play().then(() => {
          this.isPause = true;
          audioEl.innerHTML = this.drawAudioIcon();
        });

        audioPlayer.onended = () => {
          queue++;
          if (queue === 1) {
            audioPlayer.src = `${url}/${item.audioExample}`;
            void audioPlayer.play();
          }
          if (queue === 2) {
            audioPlayer.src = `${url}/${item.audioMeaning}`;
            void audioPlayer.play();
          }
          if (queue > 2) {
            this.isPause = false;
            audioEl.innerHTML = this.drawAudioIcon();
            queue = 0;
          }
        };
      }
    });
  };

  stopAllAudio = (
    clickedIcon: HTMLElement,
    clickedPlayer: HTMLAudioElement
  ) => {
    const audiosIcon = document.querySelectorAll(".audio");
    const audiosPlayer = document.querySelectorAll("audio");

    audiosIcon.forEach((audioIcon) => {
      if (audioIcon !== clickedIcon)
        audioIcon.innerHTML = this.drawAudioIcon(false);
    });
    audiosPlayer.forEach((audioPlayer) => {
      if (audioPlayer !== clickedPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
    });
  };
  isEnyonePlaying = (): boolean => {
    const audiosPlayer = document.querySelectorAll("audio");
    let isPlaying = false;

    audiosPlayer.forEach((audioPlayer: HTMLAudioElement) => {
      if (audioPlayer.currentTime > 0) isPlaying = true;
    });
    return isPlaying;
  };
}
