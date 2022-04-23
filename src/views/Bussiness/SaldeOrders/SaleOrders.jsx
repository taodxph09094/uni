import React, { useEffect, useState } from 'react';
// reactstrap components
// core components
import { useGetData } from '../../../hooks/services/useGetApi';
import { BUSINESS_URL } from '../../../constants/api';
import BaseAdminContainer from 'components/BaseAdminContainer';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardBody, Container, FormGroup, Label, Row } from 'reactstrap';
import { Field, Form, Formik } from 'formik';
import CustomDataTable from '../../../components/Core/CustomDataTable';
import { convertToFormSelect, numberWithCommas } from '../../../helpers';
import Panels from '../../../components/Core/Panels';
import SelectboxField from 'components/CustomField/SelectboxField';
import DatePickerField from 'components/CustomField/DatePickerField';
import { Link } from 'react-router-dom';
import { RouteBase } from '../../../constants/routeUrl';
import moment from 'moment';

const SaleOrders = () => {
  const { t } = useTranslation();

  const initParams = {
    page: 0,
    size: 20,
  };

  const [paramRequest, setParamRequest] = useState(initParams);
  const getMerchants = useGetData(BUSINESS_URL.GET_LIST_MERCHANT) || [];
  const getSaleOrders = useGetData(BUSINESS_URL.GET_LIST_SALE_ORDERS, paramRequest);

  useEffect(() => {
    getSaleOrders._getData(null, paramRequest).then();
  }, [paramRequest]);

  const formInitValue = {
    merchantName: '',
    saleDateFrom: '',
    saleDateTo: '',
  };

  const search = (values) => {
    let valueSearch = { ...values };
    if (valueSearch.saleDateFrom) {
      valueSearch.saleDateFrom = moment(valueSearch.saleDateFrom).format('YYYY-MM-DD');
    }
    if (valueSearch.saleDateTo) {
      valueSearch.saleDateTo = moment(valueSearch.saleDateTo).format('YYYY-MM-DD');
    }
    setParamRequest({ ...paramRequest, ...valueSearch, page: 0 });
  };

  const reset = () => {
    setParamRequest(initParams);
  };

  const columns = [
    {
      cell: (row) => {
        return <Link to={`/admin${RouteBase.SaleOrdersDetail}?id=${row?.id}`}>{row.code}</Link>;
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: t('saleOrders:table.code'),
      sortable: true,
    },
    {
      name: t('saleOrders:table.merchant'),
      selector: (row) => row.merchantName,
      sortable: true,
    },
    {
      name: t('saleOrders:table.sum'),
      selector: (row) => numberWithCommas(row.paidAmount),
      sortable: true,
    },
    {
      name: t('saleOrders:table.sale_time'),
      selector: (row) => moment(row.saleDate).format('DD/MM/YYYY HH:mm'),
      sortable: true,
    },
  ];

  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0">
          <Panels>
            <Formik
              initialValues={formInitValue}
              onSubmit={(values) => {
                search(values);
              }}
            >
              {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
                <Form>
                  <Row>
                    <FormGroup className="col-sm-3">
                      <Label>{t('saleOrders:field.merchant')}</Label>
                      <Field
                        name="merchantName"
                        placeholder={t('common:field.choose')}
                        data={convertToFormSelect(getMerchants?.data?.data ?? [], 'name', 'id', true)}
                        component={SelectboxField}
                      />
                    </FormGroup>
                    <div className="col-sm-1" />
                    <FormGroup className="col-sm-3">
                      <Label>{t('saleOrders:field.sale_date')}</Label>
                      <Field name="saleDateFrom" placeholder={t('common:field.choose')} component={DatePickerField} />
                    </FormGroup>
                    <div className="col-sm-1" />
                    <FormGroup className="col-sm-3">
                      <Label>&nbsp;</Label>
                      <Field name="saleDateTo" placeholder={t('common:field.choose')} component={DatePickerField} />
                    </FormGroup>
                  </Row>
                  <Row>
                    <div className="col-sm-12 text-right">
                      <Button color="default" outline type="reset" onClick={reset}>
                        {t('common:button.reset')}
                      </Button>
                      <Button color="primary" type="submit">
                        {t('common:button.search')}
                      </Button>
                    </div>
                  </Row>
                </Form>
              )}
            </Formik>
          </Panels>
        </Card>
        <Card className="bg-secondary shadow border-0 mt-4">
          <CardBody>
            <CustomDataTable
              data={getSaleOrders?.data?.data}
              columns={columns}
              progressPending={getSaleOrders?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={getSaleOrders?.data?.pagination?.totalRecords ?? 0}
              onChangeRowsPerPage={(val) => {
                setParamRequest({ ...paramRequest, size: val, page: 0 });
              }}
              onChangePage={(val) => {
                setParamRequest({ ...paramRequest, page: val - 1 });
              }}
            />
          </CardBody>
        </Card>
      </Container>
    </BaseAdminContainer>
  );
};

export default SaleOrders;
