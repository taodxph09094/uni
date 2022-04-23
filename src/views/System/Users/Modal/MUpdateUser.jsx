import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { usePutData } from '../../../../hooks/services/usePutApi';
import { SYSTEM_URL } from '../../../../constants/api';
import { alertService } from '../../../../services/alertService';

const MUpdateUser = (props) => {
  const { formValues, isOpen, setModalOpen, refreshParent } = props;
  const { t } = useTranslation();

  const formInitValue = {
    surname: formValues?.surname,
    givenName: formValues?.givenName,
    phone: formValues?.phone,
    email: formValues?.email,
  };

  const validationSchema = Yup.object().shape({
    surname: Yup.string().required(t('users:field.surname') + t('common:validate.required')),
    givenName: Yup.string().required(t('users:field.name') + t('common:validate.required')),
    phone: Yup.string(),
    email: Yup.string(),
  });

  const putSuccess = (val) => {
    if (val?.status + '' === '200') {
      alertService.success(val.statusText || t('users:alert.update_success'));
    }

    // close modal
    setModalOpen(false);

    // call back to parent
    refreshParent();
  };

  const putFail = (val) => {
    alertService.error(val?.data?.message);
  };

  const putUpdateUser = usePutData(null, true, null, false, false, putSuccess, putFail);

  const onConfirm = (values) => {
    putUpdateUser._putData(`${SYSTEM_URL.GET_LIST_USER}/${formValues?.id}${SYSTEM_URL.UPDATE_USER}`, values).then();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          {t('users:field.update_user')}
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
                    {t('users:field.surname')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="surname"
                    tag={Field}
                    placeholder={t('common:field.input_data')}
                    value={values.surname}
                    invalid={!!(touched.surname && errors.surname)}
                  />
                  <FormFeedback>{errors.surname}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    {t('users:field.name')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="givenName"
                    tag={Field}
                    placeholder={t('common:field.input_data')}
                    value={values.givenName}
                    invalid={!!(touched.givenName && errors.givenName)}
                  />
                  <FormFeedback>{errors.givenName}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>{t('users:field.phone_number')}</Label>
                  <Input
                    name="phone"
                    tag={Field}
                    placeholder={t('common:field.input_data')}
                    value={values.phone}
                    invalid={!!(touched.phone && errors.phone)}
                  />
                  <FormFeedback>{errors.phone}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    tag={Field}
                    placeholder={t('common:field.input_data')}
                    value={values.email}
                    invalid={!!(touched.email && errors.email)}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>
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

export default MUpdateUser;
