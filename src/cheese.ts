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

class Cheese {
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
    console.log(settings);
  }
}