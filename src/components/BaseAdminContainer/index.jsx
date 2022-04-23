import AdminFooter from 'components/Footers/AdminFooter';
import AdminHeader from 'components/Headers/AdminHeader';
import { Fragment } from 'react';
const BaseAdminContainer = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <AdminHeader />
      {children}
      {/* <AdminFooter /> */}
    </Fragment>
  );
};

export default BaseAdminContainer;
