export default function () {
  const colors = ['red', 'green', 'blue'];
  const rgb = {};

  colors.forEach((value) => {
    rgb[value] = Math.floor(Math.random() * 200);
  });

  return rgb;
}
