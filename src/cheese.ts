type Settings = {
  stream: string;
  canvas: string;
  mode?: string;
  fps?: number;

  video: {
    format?: string;
    width?: number;
    height?: number;
    frameRate?: number;
  };
};

interface Data {
  stream: string;
  canvas: string;
  mode?: string;

  constrains: {
    video: {
      width: number;
      height: number;
      frameRate: number;
    };
  };
}

class Cheese implements Data {
  stream = "video";
  canvas = "canvas";
  mode = "photo";

  constrains = {
    video: {
      facingMode: 'user',
      width: 1080,
      height: 1080,
      frameRate: 15,
    },
  };

  constructor(settings: Settings) {
    this.stream = settings.stream;
    this.canvas = settings.canvas;

    if('video' in settings) {
      if('frameRate' in settings.video) {
        this.constrains.video.frameRate = settings.video.frameRate!;
      }
    }
  }

  async init(): Promise<any> {
    return new Promise((resolve, reject) => {
      /* GRAB VIDEO ELEMENT TO STREAM ON IT */
      let video__element: any = document.querySelector(this.stream);

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {        
        navigator.mediaDevices
          .getUserMedia(this.constrains)
          .then((stream) => {
            video__element.srcObject = stream;
            console.log(video__element.src);
            video__element.play();
            resolve();
          })
          .catch((err) => reject(`${err.name}: ${err.message}`));
      } else if (navigator.getUserMedia) {        
        navigator.getUserMedia(
          { video: true },
          (stream) => {
            video__element.src = stream;
            video__element.play();
            resolve();
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }

  log(): void {
    console.log(this);
  }
}