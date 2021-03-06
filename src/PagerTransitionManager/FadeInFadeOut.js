import TransitionManager from './TransitionManager';

export default class FadeInFadeOutTransitionStyle extends TransitionManager {
  getTransitionStyleFor(pageNo, {currentPage, offset, width, height}) {
    const diffInPage = pageNo - currentPage;
    const fraction = offset - currentPage;
    let opacity = 0;

    if (diffInPage < 0 || diffInPage > 1) {
      opacity = 0;
    } else if (pageNo === currentPage) {
      opacity = 1 - fraction;
    } else {
      opacity = fraction;
    }

    return {
      opacity,
      transform: [{translateX: -pageNo * width}, {rotate: '0deg'}],
    };
  }
}
