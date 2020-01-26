import TransitionManager from './TransitionManager';

export default class ZoomOutTransition extends TransitionManager {
  getTransitionStyleFor(pageNo, {currentPage, offset, width, height}) {
    const diffInPage = pageNo - currentPage;
    const fraction = offset - currentPage;
    let scale = 0;
    let opacity = 1;
    let transition = -offset * width;

    if (diffInPage < 0 || diffInPage > 1) {
      scale = 0;
    } else if (pageNo === currentPage) {
      scale = Math.max(1 - fraction, 0.75);
    } else {
      scale = Math.max(fraction, 0.75);
    }

    return {
      opacity,
      transform: [{translateX: transition}, {rotate: '0deg'}, {scale}],
    };
  }
}
