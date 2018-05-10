const dateDifference = (createdAt, currentDate) => {
  const oneHour = 60 * 60 * 1000; // minutes*seconds*milliseconds

  let diffTime = Math.round(Math.abs((createdAt.getTime() - currentDate.getTime()) / oneHour));
  let diffTitle = null;

  if (diffTime > 23) {
    diffTime = Math.ceil(diffTime / 24);
    if (diffTime === 1) {
      diffTitle = 'day';
      diffTime = 'one';
    }
    else {
      diffTitle = 'days';
    }
  } else if (diffTime === 1) {
    diffTitle = 'hour';
    diffTime = 'one';
  } else {
    diffTitle = 'hours'
  }

  return { diffTime, diffTitle };
};

export default dateDifference;