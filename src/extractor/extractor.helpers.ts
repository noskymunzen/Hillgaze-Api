import { PictureOrientation } from 'src/pictures/pictures.enums';

export const getOrientationBySize = (width: number, height: number) => {
  const ratio = width / height;
  if (ratio === 1) {
    return PictureOrientation.SQUARE;
  }

  return ratio > 1 ? PictureOrientation.LANDSCAPE : PictureOrientation.PORTRAIT;
};
