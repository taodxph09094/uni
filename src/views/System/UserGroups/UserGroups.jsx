import React, { useEffect, useState } from 'react';
import BaseAdminContainer from 'components/BaseAdminContainer';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useGetData } from '../../../hooks/services/useGetApi';
import { SYSTEM_URL } from '../../../constants/api';
import { Button, Card, CardBody, CardHeader, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import Panels from '../../../components/Core/Panels';
import { Field, Form, Formik } from 'formik';
import CustomDataTable from '../../../components/Core/CustomDataTable';
import { Link } from 'react-router-dom';
import { RouteBase } from '../../../constants/routeUrl';
import SelectboxField from '../../../components/CustomField/SelectboxField';

const UserGroups = () => {
  const { t } = useTranslation();

  const types = [
    { id: 'INTERNAL', text: 'INTERNAL' },
    { id: 'MERCHANT', text: 'MERCHANT' },
    { id: 'STUDENT', text: 'STUDENT' },
  ];

  const initParams = {
    page: 0,
    size: 20,
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      cell: (row) => {
        return <Link to={`/admin${RouteBase.UserGroupDetails}?id=${row?.id}`}>{row?.name}</Link>;
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: t('users:table.group_name'),
      sortable: true,
    },
    {
      name: t('users:table.describe'),
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: t('users:table.type'),
      selector: (row) => row.userType,
      sortable: true,
    },
  ];

  const [paramRequest, setParamRequest] = useState(initParams);
  const getGroups = useGetData(SYSTEM_URL.GET_LIST_GROUPS, paramRequest);

  useEffect(() => {
    getGroups._getData(null, paramRequest).then();
  }, [paramRequest]);

  const formInitValue = {
    name: '',
    userType: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    userType: Yup.string(),
  });

  const reset = () => {
    setParamRequest(initParams);
  };

  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0">
          <Panels>
            <Formik
              initialValues={formInitValue}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setParamRequest({ ...paramRequest, ...values, page: 0 });
              }}
            >
              {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
                <Form>
                  <Row>
                    <FormGroup className="col-sm-3">
                      <Label>{t('users:table.group_name')}:</Label>
                      <Input
                        name="name"
                        tag={Field}
                        placeholder={t('common:field.input_data')}
                        value={values.name}
                        invalid={!!(touched.name && errors.name)}
                      />
                    </FormGroup>
                    <div className="col-sm-1" />
                    <FormGroup className="col-sm-3">
                      <Label>{t('users:field.type')}:</Label>
                      <Field
                        name="userType"
                        placeholder={t('common:field.choose')}
                        data={types}
                        component={SelectboxField}
                      />
                    </FormGroup>
                    <div className="col-sm-1" />
                    <FormGroup className="col-sm-4 text-right">
                      <Label>&nbsp;</Label>
                      <div>
                        <Button color="default" outline type="reset" onClick={reset}>
                          {t('common:button.reset')}
                        </Button>
                        <Button color="primary" type="submit">
                          {t('common:button.search')}
                        </Button>
                      </div>
                    </FormGroup>
                  </Row>
                </Form>
              )}
            </Formik>
          </Panels>
        </Card>
        <Card className="bg-secondary shadow border-0 mt-4">
          <CardHeader className="row panel-card-header-custom">
            <h1 className="font-weight-bold col-sm-3">{t('users:field.user_group')}</h1>
          </CardHeader>
          <CardBody>
            <CustomDataTable
              data={getGroups?.data?.data}
              columns={columns}
              progressPending={getGroups?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={getGroups?.data?.pagination?.totalRecords ?? 0}
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

export default UserGroups;
