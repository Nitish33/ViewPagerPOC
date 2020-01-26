export default class TransitionManager {
  constructor() {}

  getTransitionStyleFor(pageNo, {currentPage, offset, width, height}) {
    const v = -offset * width;

    return {transform: [{translateX: v}, {rotate: '0deg'}]};
  }
}
