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

// reactstrap components
import { Button, Card, CardBody, Col, FormFeedback, FormGroup, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { login } from 'redux/modules/auth';
import { GetAuthSelector } from 'redux/selectors/auth';
import { Redirect } from 'react-router-dom';
import { RouteBase } from 'constants/routeUrl';
import { alertService } from '../../services/alertService';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const Login = () => {
  const dispatch = useDispatch();
  const auth = GetAuthSelector();
  const { isLogin, isSendRequest } = auth;
  const { t } = useTranslation();
  useEffect(() => {
    if (auth?.error?.data?.message) {
      alertService.error(auth?.error?.data?.message);
    }
  }, [auth]);

  if (isLogin) {
    return <Redirect to={RouteBase.Home} />;
  }
  const formInitValue = {
    rememberMe: false,
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('login:validate.usernameRequired')),
    password: Yup.string().required(t('login:validate.passwordRequired')),
  });

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>{t('login:signInTitle')}</small>
            </div>
            <Formik
              initialValues={formInitValue}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(login(values.username, values.password));
              }}
            >
              {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
                <Form>
                  <FormGroup className="mb-3">
                    <Input
                      name="username"
                      tag={Field}
                      placeholder={t('login:field.username')}
                      value={values.username}
                      invalid={touched.username && errors.username ? true : false}
                    />
                    <FormFeedback>{errors.username}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <Input
                      name="password"
                      tag={Field}
                      placeholder={t('login:field.password')}
                      type="password"
                      value={values.password}
                      invalid={touched.password && errors.password ? true : false}
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>
                  {/* <div className="custom-control custom-control-alternative custom-checkbox">
                    <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                    <label className="custom-control-label" htmlFor=" customCheckLogin">
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div> */}
                  <div className="text-center">
                    <Button className="my-4" color="primary" disabled={isSendRequest} type="submit">
                      {t('login:field.btnSubmit')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
