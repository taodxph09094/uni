import React, { Fragment } from 'react';
const DefaultLayout = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <main className="main-container">{children}</main>
    </Fragment>
  );
};

export default DefaultLayout;
