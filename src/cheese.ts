type Settings = {
  stream: string;
  canvas: string;
  mode?: string;
  fps?: Number;

  video: {
    format?: string;
    width?: Number;
    height?: Number;
  }
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
      width: 1080,
      height: 1080,
      frameRate: 15,
    }
  };

  constructor(settings: Settings) {
    this.stream = settings.stream;
    this.canvas = settings.canvas;
  }
}