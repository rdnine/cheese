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
    },
    audio: boolean
  }

  pictures: string[]

  video__element: HTMLVideoElement
  canvas__element: HTMLCanvasElement
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
    audio: false
  };

  pictures: string[] = [];

  video__element: HTMLVideoElement;
  canvas__element: HTMLCanvasElement;

  constructor(settings: Settings) {
    this.video__element = document.querySelector<HTMLVideoElement>(settings.stream)!;
    this.canvas__element = document.querySelector < HTMLCanvasElement>(settings.canvas)!;

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
          .catch(err => {
            reject(`${err.name}: ${err.message}`);
            alert(`No device found. Check the logs for error!`);
          });
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
      } else {
        throw new Error('Your browser is not supported');
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

  snap(): void {
    let context = this.canvas__element.getContext("2d") as CanvasRenderingContext2D;
    console.log(this.video__element.videoHeight);
    console.log(this.video__element.videoWidth);
    
    context.drawImage(this.video__element, (this.video__element.videoWidth - this.canvas__element.width) / 2, 0, this.canvas__element.height, this.canvas__element.width, 0, 0, this.canvas__element.width, this.canvas__element.height)

    this.pictures[this.pictures.length] = this.canvas__element.toDataURL('image/jpeg', 1);
  }

  log(): void {
    console.log(this);
  }
}