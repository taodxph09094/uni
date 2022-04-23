import React, { useEffect, useState } from 'react';
import BaseAdminContainer from 'components/BaseAdminContainer';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useGetData } from '../../../hooks/services/useGetApi';
import { SYSTEM_URL } from '../../../constants/api';
import { Badge, Button, Card, CardBody, CardHeader, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import Panels from '../../../components/Core/Panels';
import { Field, Form, Formik } from 'formik';
import CustomDataTable from '../../../components/Core/CustomDataTable';
import { Link } from 'react-router-dom';
import { RouteBase } from '../../../constants/routeUrl';
import MCreateUser from './Modal/MCreateUser';
import MUpdateUser from './Modal/MUpdateUser';
import MResetPassUser from './Modal/MResetPassUser';

const Users = () => {
  const { t } = useTranslation();

  const initParams = {
    page: 0,
    size: 20,
  };

  const styleBtn = { color: '#5e72e4', cursor: 'pointer', fontSize: 18 };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      cell: (row) => {
        return <Link to={`/admin${RouteBase.UserDetails}?id=${row?.id}`}>{row?.surname + ' ' + row?.givenName}</Link>;
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: t('users:table.full_name'),
      sortable: true,
    },
    {
      name: t('users:table.username'),
      selector: (row) => row.username,
      sortable: true,
    },
    {
      cell: (row) => {
        if (row.enabled) {
          return <Badge color="success">{t('users:table.active')}</Badge>;
        } else {
          return <Badge color="warning">{t('users:table.ban')}</Badge>;
        }
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: t('users:table.status'),
      sortable: true,
    },
    {
      name: t('users:table.type'),
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: t('users:table.language'),
      selector: (row) => row.locale,
      sortable: true,
    },
    {
      name: t('users:table.time_zone'),
      selector: (row) => row.timezone,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <>
            <i
              style={styleBtn}
              className="ni ni-check-bold mr-3"
              title={t('users:button.update_info')}
              onClick={(event) => updateUser(event, row)}
            />
            <i
              style={styleBtn}
              className="ni ni-curved-next"
              title={t('users:button.reset_pass')}
              onClick={(event) => resetPass(event, row)}
            />
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: t('common:table.action'),
    },
  ];

  const [paramRequest, setParamRequest] = useState(initParams);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalResetOpen, setModalResetOpen] = useState(false);
  const getUsers = useGetData(SYSTEM_URL.GET_LIST_USER, paramRequest);
  const getUser = useGetData(null, null, true, false, false);

  useEffect(() => {
    getUsers._getData(null, paramRequest).then();
  }, [paramRequest]);

  const formInitValue = {
    fullname: '',
    username: '',
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string(),
    username: Yup.string(),
  });

  const refreshPage = () => {
    setParamRequest({ ...paramRequest, page: 0 });
  };

  const reset = () => {
    setParamRequest(initParams);
  };

  const createUser = () => {
    setModalCreateOpen(!modalCreateOpen);
  };

  const getUserDetailById = (value) => {
    return getUser._getData(`${SYSTEM_URL.GET_LIST_USER}/${value.id}`);
  };

  const updateUser = async (e, value) => {
    await getUserDetailById(value);
    setModalUpdateOpen(!modalUpdateOpen);
  };

  const resetPass = async (e, value) => {
    await getUserDetailById(value);
    setModalResetOpen(!modalResetOpen);
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
                      <Label for="fullname">{t('users:field.full_name')}:</Label>
                      <Input
                        id="fullname"
                        name="fullname"
                        tag={Field}
                        placeholder={t('common:field.input_data')}
                        value={values.fullname}
                        invalid={!!(touched.fullname && errors.fullname)}
                      />
                    </FormGroup>
                    <div className="col-sm-1" />
                    <FormGroup className="col-sm-3">
                      <Label for="username">{t('users:field.username')}:</Label>
                      <Input
                        id="username"
                        name="username"
                        tag={Field}
                        placeholder={t('common:field.input_data')}
                        value={values.username}
                        invalid={!!(touched.username && errors.username)}
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
            <h1 className="font-weight-bold col-sm-3">{t('users:field.user')}</h1>
            <div className="col-sm-9 text-right">
              <Button color="primary" type="button" onClick={createUser}>
                {t('users:button.create_user')}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <CustomDataTable
              data={getUsers?.data?.data}
              columns={columns}
              progressPending={getUsers?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={getUsers?.data?.pagination?.totalRecords ?? 0}
              onChangeRowsPerPage={(val) => {
                setParamRequest({ ...paramRequest, size: val, page: 0 });
              }}
              onChangePage={(val) => {
                setParamRequest({ ...paramRequest, page: val - 1 });
              }}
            />
          </CardBody>
        </Card>
        <MCreateUser isOpen={modalCreateOpen} setModalOpen={setModalCreateOpen} refreshParent={refreshPage} />
        <MUpdateUser
          isOpen={modalUpdateOpen}
          setModalOpen={setModalUpdateOpen}
          refreshParent={refreshPage}
          formValues={getUser.data}
        />
        <MResetPassUser isOpen={modalResetOpen} setModalOpen={setModalResetOpen} formValues={getUser.data} />
      </Container>
    </BaseAdminContainer>
  );
};

export default Users;
