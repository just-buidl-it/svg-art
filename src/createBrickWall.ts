import Paper, { Path, Point, Size } from 'paper'

const createBrick = (x: number, y: number, w: number, h: number, strokeColor: string, fillColor: string) => {
  const topLeft = new Point(x, y);
  const rectSize = new Size(w, h);
  const brick = new Path.Rectangle(topLeft, rectSize);
  // @ts-expect-error string is valid here
  brick.strokeColor = strokeColor;
  // @ts-expect-error string is valid here
  brick.fillColor = fillColor;
}

interface BrickWallConfig {
  brickHeight: number,
  brickWidth: number,
  wallHeight: number,
  wallWidth: number,
  strokeColor: string,
  fillColor: string
}

const createBrickWall = async ({ brickHeight, brickWidth, wallHeight, wallWidth, strokeColor, fillColor }: BrickWallConfig) => {
  Paper.setup(new Paper.Size(wallWidth, wallHeight));
  let x = 0;
  let y = 0;

  while (y < wallHeight - brickHeight) {

    while (x < wallWidth - brickWidth) {
      let width = brickWidth;
      if ((y / brickHeight) % 2 == 1 && x == 0) {
        width = brickWidth / 2
      }
      createBrick(x, y, brickWidth, brickHeight, strokeColor, fillColor)

      x += width;
    }
    // Create an extra brick if we are on an odd row
    if ((y / brickHeight) % 2 == 1) {
      createBrick(x, y, brickWidth / 2, brickHeight, strokeColor, fillColor)
    }

    x = 0;
    y += brickHeight;
  }
}

export default createBrickWall