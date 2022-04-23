import React, { useEffect, useState } from 'react';
import { useGetData } from '../../hooks/services/useGetApi';
import { BUSINESS_URL, TRANSACTION_URL } from '../../constants/api';
import BaseAdminContainer from 'components/BaseAdminContainer';
import { Badge, Button, Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
import CustomDataTable from '../../components/Core/CustomDataTable';
import { useTranslation } from 'react-i18next';
import { FastField, Field, Form, Formik } from 'formik';
import InputField from '../../components/CustomField/InputField';
import { Link } from 'react-router-dom';
import { RouteBase } from '../../constants/routeUrl';
import { convertToFormSelect } from '../../helpers';
import SelectboxField from '../../components/CustomField/SelectboxField';
import Panels from '../../components/Core/Panels';
import MAddOrEditPOS from './MAddOrEditPOS';

const PointOfSales = () => {
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
      name: t('pos:field.name'),
      cell: (row) => {
        return <Link to={`/admin${RouteBase.POSDetail}?id=${row?.id}`}>{row.name}</Link>;
      },
      ignoreRowClick: true,
      allowOverflow: true,
      sortable: true,
    },
    {
      name: t('pos:field.merchant'),
      selector: (row) => row.merchantName,
      sortable: true,
    },
    {
      name: t('pos:field.school'),
      selector: (row) => row.schoolName,
      sortable: true,
    },
    {
      name: t('pos:field.canteen'),
      selector: (row) => row.canteenName,
      sortable: true,
    },
    {
      name: t('pos:field.status'),
      cell: (row) => {
        return (
          <Badge color={row.status ? 'success' : 'danger'}>
            {row.status ? t('pos:field.status.enable') : t('pos:field.status.disable')}
          </Badge>
        );
      },
      sortable: true,
      maxWidth: '150px',
    },
  ];
  const [paramRequest, setParamRequest] = useState(initParams);
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const getPosList = useGetData(TRANSACTION_URL.GET_LIST_POS, initParams);
  const getSchoolList = useGetData(TRANSACTION_URL.GET_LIST_SCHOOL);
  const getMerchantList = useGetData(BUSINESS_URL.GET_LIST_MERCHANT);
  const getCanteenList = useGetData(TRANSACTION_URL.GET_LIST_CANTEENS);

  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getPosList._getData(null, paramRequest);
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

  function onSearch(params) {
    setParamRequest({ ...paramRequest, ...params, page: 0 });
  }

  function openCreatePOS() {
    setModalOpen(!modalOpen);
  }

  function refreshPage() {
    setParamRequest({ ...paramRequest, page: 0 });
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
                merchantName: '',
                schoolId: '',
              }}
              onSubmit={(values) => onSearch(values)}
            >
              <Form>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <Label>{t('pos:field.name')}</Label>
                    <FastField component={InputField} name="name" className="form-control" />
                  </div>
                  <div className="col-sm-3 offset-sm-1">
                    <Label>{t('pos:field.merchant')}</Label>
                    <FastField component={InputField} name="merchantName" className="form-control" />
                  </div>
                  <div className="col-lg-3 offset-sm-1">
                    <Label>{t('pos:field.school')}</Label>
                    <Field
                      name="schoolId"
                      placeholder={t('common:field.choose')}
                      data={convertToFormSelect(schools ?? [], 'name', 'id', true, t('pos:field.selectDefault'))}
                      component={SelectboxField}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div>
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
              <Button color="primary" className="ml-auto" onClick={openCreatePOS}>
                {t('pos:button.add')}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <CustomDataTable
              data={getPosList?.data?.data}
              columns={columns}
              progressPending={getPosList?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={getPosList?.data?.pagination?.totalRecords ?? 0}
              onChangeRowsPerPage={(val) => {
                setParamRequest({ ...paramRequest, size: val, page: 0 });
              }}
              onChangePage={(val) => {
                setParamRequest({ ...paramRequest, page: val - 1 });
              }}
            />
          </CardBody>
        </Card>
        <MAddOrEditPOS
          isUpdate={false}
          isOpen={modalOpen}
          setModalOpen={setModalOpen}
          refreshParent={refreshPage}
          schools={getSchoolList?.data?.data}
          merchants={getMerchantList?.data?.data}
          canteens={getCanteenList?.data?.data}
        />
      </Container>
    </BaseAdminContainer>
  );
};

export default PointOfSales;
