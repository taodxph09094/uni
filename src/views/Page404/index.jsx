import React from 'react';
import AdminHeader from 'components/Headers/AdminHeader';
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
// core components
const Page404 = (props) => {
  return (
    <>
      <AdminHeader />
      <div className="mt-3 ml-3">404 not found!</div>
    </>
  );
};

export default Page404;
