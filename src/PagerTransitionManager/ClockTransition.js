import TransitionManager from './TransitionManager';

export default class ClockTransition extends TransitionManager {
  getTransitionStyleFor(pageNo, {currentPage, offset, width, height}) {
    const diffInPage = pageNo - currentPage;
    const fraction = offset - currentPage;
    let scale = 0;
    let rotation = '0deg';
    let opacity = 1;

    if (diffInPage < 0 || diffInPage > 1) {
      scale = 0;
      opacity = 0;
    } else if (pageNo === currentPage) {
      scale = Math.max(1 - 3 * fraction, 0.75);
      opacity = 1 - Math.round(fraction);
      rotation = `${offset * 360}deg`;
    } else {
      scale = Math.max(fraction, 0.75);
      opacity = Math.round(fraction);
      rotation = `${offset * 360}deg`;
    }

    return {
      opacity,
      transform: [{translateX: -pageNo * width}, {rotate: rotation}, {scale}],
    };
  }
}
