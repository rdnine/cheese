let sayCheese = new Cheese({
  stream: '#stream',
  canvas: '#render',
  video: {
    width: 720,
    height: 720,
    frameRate: 30
  }
});

document.getElementById("start").addEventListener('click', () => {
  sayCheese.init();
});

document.getElementById("log").addEventListener('click', () => {
  sayCheese.log();
});

document.getElementById("stop").addEventListener('click', () => {
  sayCheese.stop();
});