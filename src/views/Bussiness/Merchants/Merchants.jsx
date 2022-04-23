import React, { useEffect, useState } from 'react';
import BaseAdminContainer from '../../../components/BaseAdminContainer';
import { Badge, Button, Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
import { FastField, Form, Field, Formik } from 'formik';
import InputField from '../../../components/CustomField/InputField';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RouteBase } from '../../../constants/routeUrl';
import { useGetData } from '../../../hooks/services/useGetApi';
import { BUSINESS_URL, TRANSACTION_URL } from '../../../constants/api';
import CustomDataTable from '../../../components/Core/CustomDataTable';
import MUpdateMerchant from './MUpdateMerchant';
import Panels from '../../../components/Core/Panels';

const Merchants = () => {
  const { t } = useTranslation();
  const initParams = {
    page: 0,
    size: 20,
  };
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '30px',
    },
    {
      name: t('merchant:table.merchant'),
      selector: (row) => {
        return <Link to={`/admin${RouteBase.MerchantDetails}?id=${row?.id}`}>{row.name}</Link>;
      },
      sortable: true,
    },
    {
      name: t('merchant:table.address'),
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: t('merchant:table.phone'),
      selector: (row) => row.phone,
      sortable: true,
      maxWidth: '150px',
    },
    {
      name: t('merchant:table.enabled'),
      cell: (row) => {
        return (
          <Badge color={row.enabled ? 'success' : 'danger'}>
            {row.enabled ? t('merchant:table.enabled.enable') : t('merchant:table.enabled.disable')}
          </Badge>
        );
      },
      sortable: true,
      maxWidth: '150px',
    },
  ];
  const [paramRequest, setParamRequest] = useState(initParams);
  const [modalOpen, setModalOpen] = useState(false);
  const [schools, setSchools] = useState([]);

  const getMerchantList = useGetData(BUSINESS_URL.GET_LIST_MERCHANT, initParams);
  const getSchoolList = useGetData(TRANSACTION_URL.GET_LIST_SCHOOL);
  const getCanteenList = useGetData(TRANSACTION_URL.GET_LIST_CANTEENS);

  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getMerchantList._getData(null, paramRequest);
    }
    return () => {
      isCurrent = false;
    };
  }, [paramRequest]);

  useEffect(() => {
    let isCurrent = true;
    if (getSchoolList.data.data && !!isCurrent) {
      setSchools(getSchoolList.data.data);
    }
    return () => {
      isCurrent = false;
    };
  }, [getSchoolList]);

  const onSearch = (params) => {
    setParamRequest({ ...paramRequest, ...params, page: 0 });
  };

  function openModalMerchant() {
    setModalOpen(!modalOpen);
  }

  function refreshPage() {
    setParamRequest({ ...paramRequest, page: 0 });
  }

  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="shadow">
          <CardBody>
            <Panels>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{
                  name: '',
                  address: '',
                  phone: '',
                }}
                onSubmit={(values) => onSearch(values)}
              >
                <Form>
                  <div className="row form-group">
                    <div className="col-lg-1 align-self-center">
                      <Label>{t('merchant:field.merchant')}: </Label>
                    </div>
                    <div className="col-lg-3">
                      <FastField component={InputField} name="name" className="form-control" />
                    </div>
                    <div className="col-lg-1 align-self-center">
                      <Label>{t('merchant:field.address')}: </Label>
                    </div>
                    <div className="col-lg-3">
                      <FastField component={InputField} name="address" className="form-control" />
                    </div>
                    <div className="col-lg-1 align-self-center">
                      <Label>{t('merchant:field.phone')}: </Label>
                    </div>
                    <div className="col-lg-3">
                      <FastField component={InputField} name="phone" className="form-control" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div>
                      <Button type="reset">{t('merchant:button.reset')}</Button>
                      <Button type="submit" color="primary">
                        {t('merchant:button.search')}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </Panels>
          </CardBody>
        </Card>
        <Card className="shadow mt-3">
          <CardHeader>
            <div className="d-flex">
              <Button color="primary" className="ml-auto" onClick={openModalMerchant}>
                {t('merchant:button.add')}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <CustomDataTable
              data={getMerchantList?.data?.data}
              columns={columns}
              progressPending={getMerchantList?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={getMerchantList?.data?.pagination?.totalRecords ?? 0}
              onChangeRowsPerPage={(val) => {
                setParamRequest({ ...paramRequest, size: val, page: 0 });
              }}
              onChangePage={(val) => {
                setParamRequest({ ...paramRequest, page: val - 1 });
              }}
            />
          </CardBody>
        </Card>
        <MUpdateMerchant isUpdate={false} isOpen={modalOpen} setModalOpen={setModalOpen} refreshParent={refreshPage} />
      </Container>
    </BaseAdminContainer>
  );
};

export default Merchants;
