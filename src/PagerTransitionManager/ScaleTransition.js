import TransitionManager from './TransitionManager';

export default class ScaleTransition extends TransitionManager {
  getTransitionStyleFor(pageNo, {currentPage, offset, width, height}) {
    const diffInPage = pageNo - currentPage;
    const fraction = offset - currentPage;
    let scale = 0;
    let opacity = 1;

    if (diffInPage < 0 || diffInPage > 1) {
      scale = 0;
    } else if (pageNo === currentPage) {
      scale = 1 - fraction;
      opacity = 1 - Math.round(fraction);
    } else {
      scale = fraction;
      opacity = Math.round(fraction);
    }

    return {
      opacity,
      transform: [{translateX: -pageNo * width}, {rotate: '0deg'}, {scale}],
    };
  }
}
