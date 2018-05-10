import React, { Fragment } from 'react';



const Issue = props => {
  let { createdAt } = props;
  createdAt = new Date(createdAt);
  const currentDate = new Date();
  const oneHour = 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const diffHours = Math.round(Math.abs((createdAt.getTime() - currentDate.getTime()) / oneHour));

  return <Fragment>
      <h3>{props.title}</h3>
      <p>
        #{props.number} opened at {createdAt.toLocaleString('ru-RU')}, {diffHours} hours ago by <a
          href={props.user.userUrl}
        >
          {props.user.userLogin}
        </a>
      </p>
    </Fragment>;
};

export default Issue;
