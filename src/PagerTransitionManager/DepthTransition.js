import TransitionManager from './TransitionManager';

export default class DepthTransition extends TransitionManager {
  getTransitionStyleFor(pageNo, {currentPage, offset, width, height}) {
    const diffInPage = pageNo - currentPage;
    const fraction = offset - currentPage;
    let scale = 0.5;
    let translation = -pageNo * width;

    if (diffInPage < 0 || diffInPage > 1) {
      scale = 0;
    } else if (pageNo === currentPage) {
      scale = 1;
      translation = -(pageNo + fraction) * width;
    } else {
      scale = Math.max(fraction, 0.5);
    }

    console.log(pageNo, scale, translation);

    return {
      transform: [{translateX: translation}, {rotate: '0deg'}, {scale}],
      zIndex: 100 / (pageNo + 1),
    };
  }
}
