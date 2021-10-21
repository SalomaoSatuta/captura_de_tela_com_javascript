const getCapture1 = async () => {
  const stream = await window.navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" },
  });
  // get correct video track
  const track = stream.getVideoTracks()[0];
  // init Image Capture and not Video stream
  const imageCapture = new ImageCapture(track);
  // take first frame only
  const bitmap = await imageCapture.grabFrame();
  // destory video track to prevent more recording / mem leak
  track.stop();

  const canvas = document.createElement("canvas");
  // this could be a document.createElement('canvas') if you want
  // draw weird image type to canvas so we can get a useful image
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
  const image = canvas.toDataURL();

  return image;
};

(async () => {
  let val = await getCapture1();
  imgTT.setAttribute("src", val);
})();
