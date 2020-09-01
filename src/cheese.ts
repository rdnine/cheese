/**
 * @package cheese 
 * 
 * @author Rafael Duarte
 * @description Webcam Controller and Snap Shot
 * @version 0.0.9-rc
 * 
*/

/**
  * Type settings for the constructor
  * Defines what values and what type of what can be delivered or defined
*/

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

/**
  * Data interface for the Class.
  * 
  * Defines value types
  * Defines what is required to exist and what is optional
*/
interface Data {
  stream: string
  canvas: string
  target?: string
  active: boolean

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
  target__element: HTMLImageElement
}

class Cheese implements Data {
  stream = "video"; // Video Stream. Usually a video HTML tag
  canvas = "canvas"; // Canvas HTML tag to draw the image on Snap
  target = "img"; // Target HTML image tag to show the Snap
  active = false; // Defines if the Streaming Source is active

  // Constrains to be delivered to getUserMedia
  constrains = {
    video: {
      facingMode: "environment",
      width: {
        min: 640,
        ideal: 1080,
        max: 1920,
      },
      height: {
        min: 640,
        ideal: 1080,
        max: 1080,
      },
      frameRate: {
        ideal: 30,
        max: 60,
      },
      aspectRatio: 1,
    },
    audio: false,
  };

  pictures: string[] = [];

  video__element = document.querySelector<HTMLVideoElement>(this.stream)!;
  canvas__element = document.querySelector<HTMLCanvasElement>(this.canvas)!;
  target__element = document.querySelector<HTMLImageElement>(this.target)!;

  /**
   * Constructor of the class
   *
   * @param settings
   *
   * Where the settings get defined
   *
   */

  constructor(settings: Settings) {
    if ("stream" in settings) {
      this.video__element = document.querySelector<HTMLVideoElement>(
        settings.stream
      )!;
    }

    if ("canvas" in settings) {
      this.canvas__element = document.querySelector<HTMLCanvasElement>(
        settings.canvas
      )!;
    }

    if ("target" in settings) {
      //this.target__element = document.querySelector<HTMLImageElement>(settings.target)!;
    }

    if ("video" in settings) {
      if ("width" in settings.video) {
        this.constrains.video.width.ideal = settings.video.width!;
      }

      if ("height" in settings.video) {
        this.constrains.video.height.ideal = settings.video.height!;
      }

      if ("frameRate" in settings.video) {
        this.constrains.video.frameRate.ideal = settings.video.frameRate!;
      }
    }
  }

  /**
   * Init function for the webcam
   *
   * @returns Promise
   */

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {      
      if (!this.active) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia(this.constrains)
            .then((stream) => {
              this.video__element.srcObject = stream;
              this.video__element.play();
              this.active = true;
              resolve();
            })
            .catch((err) => {
              reject(`${err.name}: ${err.message}`);
              alert(`No device found. Check the logs for error!`);
            });
        } else if (navigator.getUserMedia) {
          navigator.getUserMedia(
            { video: true },
            (stream) => {
              this.video__element.srcObject = stream;
              this.video__element.play();
              this.active = true;
              resolve();
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          throw new Error("Your browser is not supported");
        }
      } else {
        alert("Webcam already active");
      }
    });
  }

  /**
   * Stream stop function
   *
   * @returns void
   */

  stop(): void {
    const stream: any = this.video__element.srcObject;
    
    if (this.active) {
      const tracks = stream.getTracks();
  
      tracks.forEach(function (track: any) {
        track.stop();
      });
  
      this.video__element.srcObject = null;
    } else {
      alert("Can't stop what hasn't started!");
    }
  }

  /**
   * Snap method
   *
   * @returns void
   */

  snap(): boolean {
    if (this.active) {
      let context = this.canvas__element.getContext(
        "2d"
      ) as CanvasRenderingContext2D;

      context.drawImage(
        this.video__element,
        (this.video__element.videoWidth - this.canvas__element.width) / 2,
        0,
        this.canvas__element.height,
        this.canvas__element.width,
        0,
        0,
        this.canvas__element.width,
        this.canvas__element.height
      );

      this.pictures[this.pictures.length] = this.canvas__element.toDataURL(
        "image/jpeg",
        1
      );

      this.target__element.src = this.pictures[this.pictures.length - 1];

      this.target__element.classList.add("active");

      return true;
    } else {
      alert("Webcam not active!");
      return false;
    }
  }

  /**
   * Save method
   *
   * @returns void
   */

  save(): void {
    if(this.active) {
      let a = document.createElement("a");
      a.href = this.target__element.src;
      a.download = "snap.jpg";
      a.click();
      a.remove();
    }
  }

  /**
   * Clear method
   *
   * @returns void
   */

  clear(): void {
    this.pictures = [];
  }

  /**
   * Log method
   * for development purposes
   *
   * @returns void
   */

  log(): void {
    console.log(this);
  }
}