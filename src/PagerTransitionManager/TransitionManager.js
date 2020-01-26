export default class TransitionManager {
  constructor() {}

  getTransitionStyleFor(pageNo, {currentPage, offset, width, height}) {
    const v = (pageNo - offset) * width;

    console.log('Offset for', pageNo, pageNo - offset);
    return {transform: [{translateX: v}, {rotate: '0deg'}]};
  }
}
