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
  constructor(settings: Settings) {
    console.log(settings);
  }
}