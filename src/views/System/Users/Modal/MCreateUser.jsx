import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import SelectboxField from '../../../../components/CustomField/SelectboxField';
import { alertService } from '../../../../services/alertService';
import { useGetData } from '../../../../hooks/services/useGetApi';
import { BUSINESS_URL, SYSTEM_URL } from '../../../../constants/api';
import { convertToFormSelect } from '../../../../helpers';
import { usePostData } from '../../../../hooks/services/usePostApi';

const MCreateUser = (props) => {
  const { isOpen, setModalOpen, refreshParent } = props;
  const { t } = useTranslation();

  const types = [
    { id: 'INTERNAL', text: 'INTERNAL' },
    { id: 'MERCHANT', text: 'MERCHANT' },
    { id: 'STUDENT', text: 'STUDENT' },
  ];

  const [type, setType] = useState('');
  const [owner, setOwner] = useState('');

  const getMerchants = useGetData(SYSTEM_URL.GET_LIST_MERCHANT) || [];
  const getAllPos = useGetData(BUSINESS_URL.GET_LIST_MERCHANT + '/' + '1' + SYSTEM_URL.ALL_POS);

  const formInitValue = {
    fullName: '',
    merchantId: '',
    merchantOwner: false,
    password: '',
    type: '',
    username: '',
    posId: '',
  };

  const owners = [
    { id: true, text: t('users:field.store_owner') },
    { id: false, text: t('users:field.staff') },
  ];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(t('users:field.full_name') + t('common:validate.required')),
    merchantOwner: Yup.bool(),
    password: Yup.string().required(t('users:field.pass') + t('common:validate.required')),
    type: Yup.string().required(t('common:validate.choose') + t('users:field.user_type')),
    username: Yup.string().required(t('users:field.username') + t('common:validate.required')),
  });

  const putSuccess = (val) => {
    if (val?.status + '' === '200') {
      alertService.success(t('users:alert.create_success'));
    }
    setModalOpen(false);
    refreshParent();
  };

  const putFail = (val) => {
    alertService.error(val?.data?.message);
  };

  const postCreateUser = usePostData(null, true, null, false, false, putSuccess, putFail);

  const onConfirm = (values) => {
    void postCreateUser._postData(`${SYSTEM_URL.GET_LIST_USER}${SYSTEM_URL.CREATE_USER}`, values);
  };

  const changeType = (val) => {
    if (val) {
      console.log('val', val);
      setType(val);
    }
  };

  const changeOwner = (val) => {
    console.log('valchangeOwner', val);
    setOwner(val);
  };

  const renderMerchantAndOwner = () => {
    if (type === types[1].id) {
      return (
        <>
          <FormGroup className="col-sm-12">
            <Label>
              {t('saleOrders:field:merchant')}&nbsp;
              <span className="text-danger">*</span>
            </Label>
            <Field
              name="merchantId"
              placeholder={t('common:field.choose')}
              data={convertToFormSelect(getMerchants?.data ?? [], 'name', 'id', false)}
              component={SelectboxField}
            />
          </FormGroup>
          <FormGroup className="col-sm-12">
            <Label>
              {t('users:field.owner')}&nbsp;
              <span className="text-danger">*</span>
            </Label>
            <Field
              name="merchantOwner"
              placeholder={t('common:field.choose')}
              data={owners}
              component={SelectboxField}
            />
          </FormGroup>
        </>
      );
    }
  };

  const renderStore = () => {
    if (!owner && type === types[1].id) {
      return (
        <>
          <FormGroup className="col-sm-12">
            <Label>
              {t('users:field.store')}&nbsp;
              <span className="text-danger">*</span>
            </Label>
            <Field name="posId" placeholder={t('common:field.choose')} data={owners} component={SelectboxField} />
          </FormGroup>
        </>
      );
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          {t('users:button.create_user')}
        </h3>
        <button aria-label="Close" className="close" type="button" onClick={() => setModalOpen(false)}>
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Formik initialValues={formInitValue} validationSchema={validationSchema} onSubmit={onConfirm}>
          {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
            <Form>
              <Row>
                <FormGroup className="col-sm-12">
                  <Label>
                    {t('users:field.username')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="username"
                    tag={Field}
                    placeholder={t('common:field.input_data')}
                    value={values.username}
                    invalid={!!(touched.username && errors.username)}
                  />
                  <FormFeedback>{errors.username}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    {t('users:field.pass')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="password"
                    type="password"
                    tag={Field}
                    placeholder={t('common:field.input_data')}
                    value={values.password}
                    invalid={!!(touched.password && errors.password)}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    {t('users:field.full_name')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="fullName"
                    tag={Field}
                    placeholder={t('common:field.input_data')}
                    value={values.fullName}
                    invalid={!!(touched.fullName && errors.fullName)}
                  />
                  <FormFeedback>{errors.fullName}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    {t('users:table.type')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Field name="type" placeholder={t('common:field.choose')} data={types} component={SelectboxField} />
                  {/*{changeType(values.type)}*/}
                </FormGroup>
                {renderMerchantAndOwner()}
              </Row>
              <Row>
                <div className="col-sm-12 text-right">
                  <Button color="default" outline type="button" onClick={() => setModalOpen(false)}>
                    {t('common:button.cancel')}
                  </Button>
                  <Button color="primary" type="submit">
                    {t('common:button.ok')}
                  </Button>
                </div>
              </Row>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default MCreateUser;
