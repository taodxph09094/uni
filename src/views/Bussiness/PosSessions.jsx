import React, { useEffect, useState } from 'react';
import { useGetData } from '../../hooks/services/useGetApi';
import { TRANSACTION_URL } from '../../constants/api';
import BaseAdminContainer from 'components/BaseAdminContainer';
import { Button, Card, CardBody, Container, Label } from 'reactstrap';
import CustomDataTable from '../../components/Core/CustomDataTable';
import { useTranslation } from 'react-i18next';
import { FastField, Form, Formik } from 'formik';
import InputField from '../../components/CustomField/InputField';
import * as moment from 'moment';
import Panels from '../../components/Core/Panels';

const PosSessions = () => {
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
      name: t('pos:field.merchant'),
      selector: (row) => row.merchantName,
      sortable: true,
    },
    {
      name: t('posSessions:field.pos'),
      selector: (row) => row.posName,
      sortable: true,
    },
    {
      name: t('posSessions:field.startTime'),
      selector: (row) => (row.startTime ? moment(row.startTime).format('DD/MM/YYYY HH:mm') : null),
      sortable: true,
      maxWidth: '150px',
    },
    {
      name: t('posSessions:field.endTime'),
      selector: (row) => (row.endTime ? moment(row.endTime).format('DD/MM/YYYY HH:mm') : null),
      sortable: true,
      maxWidth: '150px',
    },
    {
      name: t('posSessions:field.staff'),
      selector: (row) => row.userSurname + ' ' + row.userGivenName,
      sortable: true,
      maxWidth: '150px',
    },
    {
      name: t('posSessions:field.orders'),
      selector: (row) => row.soCount?.toLocaleString('en-US'),
      sortable: true,
      maxWidth: '50px',
    },
    {
      name: t('posSessions:field.revenue'),
      selector: (row) => row.revenue?.toLocaleString('en-US'),
      sortable: true,
      maxWidth: '150px',
    },
  ];
  const [paramRequest, setParamRequest] = useState(initParams);
  const getPosSessionsList = useGetData(TRANSACTION_URL.GET_LIST_POS_SESSIONS, initParams);

  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getPosSessionsList._getData(null, paramRequest);
    }
    return () => {
      isCurrent = false;
    };
  }, [paramRequest]);

  function onSearch(params) {
    setParamRequest({ ...paramRequest, ...params, page: 0 });
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
                posName: '',
                staffName: '',
              }}
              onSubmit={(values) => onSearch(values)}
            >
              <Form>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <Label>{t('posSessions:field.pos')}</Label>
                    <FastField component={InputField} name="posName" className="form-control" />
                  </div>
                  <div className="col-sm-3 offset-sm-1">
                    <Label>{t('posSessions:field.staff')}</Label>
                    <FastField component={InputField} name="staffName" className="form-control" />
                  </div>
                  <div className="col-lg-4 offset-sm-1 align-self-end text-right">
                    <Button outline color="default" type="reset">
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
          <CardBody>
            <CustomDataTable
              data={getPosSessionsList?.data?.data}
              columns={columns}
              progressPending={getPosSessionsList?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={getPosSessionsList?.data?.pagination?.totalRecords ?? 0}
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

export default PosSessions;
