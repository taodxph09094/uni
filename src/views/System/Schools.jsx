import React, { useEffect, useState } from 'react';
import { useGetData } from '../../hooks/services/useGetApi';
import { TRANSACTION_URL } from '../../constants/api';
import BaseAdminContainer from 'components/BaseAdminContainer';
import { Button, Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
import CustomDataTable from '../../components/Core/CustomDataTable';
import { useTranslation } from 'react-i18next';
import { FastField, Form, Formik } from 'formik';
import InputField from '../../components/CustomField/InputField';
import Panels from '../../components/Core/Panels';
import { alertService } from '../../services/alertService';
import * as httpServices from '../../services/httpServices';
import MAddOrEditSchool from './MAddOrEditSchool';
import { Link, useHistory } from 'react-router-dom';
import { RouteBase } from '../../constants/routeUrl';

const Schools = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const initParams = {
    page: 0,
    size: 20,
  };

  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '30px',
    },
    {
      name: t('pos:field.school'),
      cell: (row) => {
        return <Link to={`/admin${RouteBase.SchoolDetail}?id=${row?.id}`}>{row.name}</Link>;
      },
      ignoreRowClick: true,
      allowOverflow: true,
      sortable: true,
    },
    {
      name: t('common:field.address'),
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: t('common:table.action'),
      cell: (row) => (
        <>
          <svg
            style={{ color: '#f5365c', cursor: 'pointer' }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
            onClick={() => onDelete(row.id)}
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
          <svg
            style={{ color: '#5e72e4', cursor: 'pointer' }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eye cursor-pointer ml-2"
            viewBox="0 0 16 16"
            onClick={() => navigateToDetail(row.id)}
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
        </>
      ),
      sortable: true,
      maxWidth: '150px',
    },
  ];
  const [paramRequest, setParamRequest] = useState(initParams);
  const getSchoolsList = useGetData(TRANSACTION_URL.GET_LIST_SCHOOL, initParams);

  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getSchoolsList._getData(null, paramRequest);
    }
    return () => {
      isCurrent = false;
    };
  }, [paramRequest]);

  function onSearch(params) {
    setParamRequest({ ...paramRequest, ...params, page: 0 });
  }

  function onDelete(id) {
    httpServices.deleteData(`${TRANSACTION_URL.GET_LIST_SCHOOL}/${id}`, null).then(
      (_) => {
        onSearch();
      },
      (reason) => {
        if (reason?.data?.message) {
          alertService.error(reason?.data?.message);
        }
      },
    );
  }

  function refreshPage() {
    setParamRequest({ ...paramRequest, page: 0 });
  }

  function openCreateModal() {
    setModalOpen(!modalOpen);
  }

  function navigateToDetail(id) {
    history.push(`/admin${RouteBase.SchoolDetail}?id=${id}`);
  }

  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="shadow">
          <Panels>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{
                name: '',
              }}
              onSubmit={(values) => onSearch(values)}
            >
              <Form>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <Label>{t('pos:field.school')}</Label>
                    <FastField component={InputField} name="name" className="form-control" />
                  </div>
                  <div className="col-lg-8 offset-sm-1 align-self-end text-right">
                    <Button color="default" outline type="reset">
                      {t('pos:button.reset')}
                    </Button>
                    <Button type="submit" color="primary">
                      {t('pos:button.search')}
                    </Button>
                  </div>
                </div>
              </Form>
            </Formik>
          </Panels>
        </Card>
        <Card className="shadow mt-3">
          <CardHeader>
            <div className="d-flex">
              <Button color="primary" className="ml-auto" onClick={openCreateModal}>
                {t('pos:button.add')}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <CustomDataTable
              data={getSchoolsList?.data?.data}
              columns={columns}
              progressPending={getSchoolsList?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={getSchoolsList?.data?.pagination?.totalRecords ?? 0}
              onChangeRowsPerPage={(val) => {
                setParamRequest({ ...paramRequest, size: val, page: 0 });
              }}
              onChangePage={(val) => {
                setParamRequest({ ...paramRequest, page: val - 1 });
              }}
            />
          </CardBody>
        </Card>
        <MAddOrEditSchool isUpdate={false} isOpen={modalOpen} setModalOpen={setModalOpen} refreshParent={refreshPage} />
      </Container>
    </BaseAdminContainer>
  );
};

export default Schools;
