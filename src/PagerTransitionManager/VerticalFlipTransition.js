import TransitionManager from './TransitionManager';

export default class VerticalFlipTransition extends TransitionManager {
  getTransitionStyleFor(pageNo, {currentPage, offset, width, height}) {
    const diffInPage = pageNo - currentPage;
    const fraction = offset - currentPage;

    let translation = -pageNo * width;
    let rotation = '0deg';
    let opacity = 1;

    if (diffInPage < 0 || diffInPage > 1) {
      scale = 0;
      opacity = 0;
    } else if (pageNo === currentPage) {
      rotation = `${fraction * 180}deg`;
      scale = 1;
      opacity = Math.round(1 - fraction);
    } else {
      rotation = `${(1 - fraction) * 180}deg`;
      opacity = Math.round(fraction);
      scale = 1;
    }

    return {
      transform: [{translateX: translation}, {rotateY: rotation}, {scale}],
      zIndex: 100 / (pageNo + 1),
      opacity,
    };
  }
}
