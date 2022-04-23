/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState } from 'react';
// reactstrap components
import { Card, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
// core components
import BaseAdminContainer from 'components/BaseAdminContainer';
import CustomDataTable from 'components/Core/CustomDataTable';
import { useGetData } from '../../hooks/services/useGetApi';
import { TRANSACTION_URL } from '../../constants/api';

const TransactionsList = () => {
  const initParams = {
    page: 0,
    size: 20,
  };
  const [paramRequest, setParamRequest] = useState(initParams);
  const getTransationList = useGetData(TRANSACTION_URL.GET_LIST_TRANSACTION, initParams);
  useEffect(() => {
    getTransationList._getData(null, paramRequest);
  }, [paramRequest]);

  const selectableRowAction = (listSelect) => {
    console.log(listSelect);
  };

  const columns = [
    {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Created Date',
      selector: (row) => row.createdDate,
      sortable: true,
    },
    {
      name: 'Currency',
      selector: (row) => row.currencyCode,
      sortable: true,
    },
    {
      name: 'Customer Code',
      selector: (row) => row.customerCode,
      sortable: true,
    },
    {
      name: 'Partner Name',
      selector: (row) => row.partnerName,
      sortable: true,
    },
    {
      name: 'Partner Trans Ref',
      selector: (row) => row.partnerTransRef,
      sortable: true,
    },
    {
      name: 'Trans Ref',
      selector: (row) => row.transRef,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn-icon-only text-light"
              href="#pablo"
              role="button"
              size="sm"
              color=""
              onClick={(e) => e.preventDefault()}
            >
              <i className="fas fa-ellipsis-v" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                Action
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                Another action
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                Something else here
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <BaseAdminContainer>
      {/* Page content */}
      <Container className="mt-3" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CustomDataTable
                title="Transaction list"
                data={getTransationList?.data?.data}
                columns={columns}
                selectableRows
                onSelectedRowsChange={(select) => {
                  selectableRowAction(select);
                }}
                progressPending={getTransationList?.isLoading}
                pagination
                paginationServer
                paginationTotalRows={getTransationList?.data?.pagination?.totalRecords ?? 0}
                onChangeRowsPerPage={(val) => {
                  setParamRequest({ ...paramRequest, size: val, page: 0 });
                }}
                onChangePage={(val) => {
                  setParamRequest({ ...paramRequest, page: val - 1 });
                }}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </BaseAdminContainer>
  );
};

export default TransactionsList;
