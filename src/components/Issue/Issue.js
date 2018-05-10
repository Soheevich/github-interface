import React, { Fragment } from 'react';

import dateDifference from '../../helpers/dateDifference';

const Issue = props => {
  let { createdAt } = props;
  createdAt = new Date(createdAt);
  const currentDate = new Date();

  const { diffTime, diffTitle } = dateDifference(createdAt, currentDate);

  return <Fragment>
      <h3>{props.title}</h3>
      <p>
        #{props.number} opened <span title={createdAt.toLocaleString('ru-RU')}>{diffTime} {diffTitle}</span> ago by <a href={props.user.userUrl}>
          {props.user.userLogin}
        </a>
      </p>
    </Fragment>;
};

export default Issue;
