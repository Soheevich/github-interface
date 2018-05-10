import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import dateDifference from '../../helpers/dateDifference';

const Issue = props => {
  let { createdAt } = props;
  createdAt = new Date(createdAt);
  const currentDate = new Date();

  const { diffTime, diffTitle } = dateDifference(createdAt, currentDate);

  return (
    <Fragment>
      <Link to={`/issue/${props.number}`}>{props.title}</Link>
      <p>
        #{props.number} opened <span title={createdAt.toLocaleString('ru-RU')}>{diffTime} {diffTitle}</span> ago by <a href={props.user.userUrl}>
          {props.user.userLogin}
        </a>
      </p>
    </Fragment>);
};

export default Issue;
