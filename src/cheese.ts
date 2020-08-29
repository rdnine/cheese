type Settings = {
  stream: string
  canvas: string
  mode?: string
  fps?: number

  video: {
    format: string
    width: number
    height: number
    frameRate: number
  };
};

interface Data {
  stream: string
  canvas: string
  mode?: string

  constrains?: {
    video: {
      facingMode: string
      width: {
        min: number
        ideal: number
        max: number
      }
      height: {
        min: number
        ideal: number
        max: number
      }
      frameRate: {
        ideal: number
        max: number
      };
      aspectRatio: number
    }
  }

  video__element: HTMLVideoElement
}

class Cheese implements Data {
  stream = "video";
  canvas = "canvas";

  constrains = {
    video: {
      facingMode: 'environment',
      width: {
        min: 640,
        ideal: 1080,
        max: 1920
      },
      height: {
        min: 640,
        ideal: 1080,
        max: 1080
      },
      frameRate: {
        ideal: 30,
        max: 60
      },
      aspectRatio: 1
    },
  };

  video__element: HTMLVideoElement;

  constructor(settings: Settings) {
    this.video__element = document.querySelector<HTMLVideoElement>(settings.stream)!;
    this.canvas = settings.canvas;

    if('video' in settings) {
      if('width' in settings.video) {
        this.constrains.video.width.ideal = settings.video.width!;
      }

      if('height' in settings.video) {
        this.constrains.video.height.ideal = settings.video.height!;
      }

      if('frameRate' in settings.video) {
        this.constrains.video.frameRate.ideal = settings.video.frameRate!;
      }
    }
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      /* GRAB VIDEO ELEMENT TO STREAM ON IT */

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {        
        navigator.mediaDevices
          .getUserMedia(this.constrains)
          .then(stream => {
            this.video__element.srcObject = stream;
            this.video__element.play();
            resolve();
          })
          .catch(err => reject(`${err.name}: ${err.message}`));
      } else if (navigator.getUserMedia) {        
        navigator.getUserMedia(
          { video: true },
          stream => {
            this.video__element.srcObject = stream;
            this.video__element.play();
            resolve();
          },
          err => {
            reject(err);
          }
        );
      }
    });
  }

  stop(): void {
    const stream: any = this.video__element.srcObject;
    
    const tracks = stream.getTracks();

    tracks.forEach(function (track: any) {
      track.stop();
    });

    this.video__element.srcObject = null;
  }

  log(): void {
    console.log(this);
  }
}