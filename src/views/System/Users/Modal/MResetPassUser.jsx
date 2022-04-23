import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { usePutData } from '../../../../hooks/services/usePutApi';
import { alertService } from '../../../../services/alertService';
import { SYSTEM_URL } from '../../../../constants/api';

const MResetPassUser = (props) => {
  const { formValues, isOpen, setModalOpen } = props;
  const { t } = useTranslation();
  const formInitValue = {
    username: formValues?.username,
    newPassword: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('users:field.surname') + t('common:validate.required')),
    newPassword: Yup.string().required(t('users:field.name') + t('common:validate.required')),
  });

  const putSuccess = (val) => {
    if (val?.status + '' === '200') {
      alertService.success(val.statusText || t('users:alert.update_success'));
    }
    // close modal
    setModalOpen(false);
  };

  const putFail = (val) => {
    alertService.error(val?.data?.message);
  };

  const putUpdateUser = usePutData(null, true, null, false, false, putSuccess, putFail);

  const onConfirm = (values) => {
    putUpdateUser._putData(`${SYSTEM_URL.GET_LIST_USER}/${formValues?.id}${SYSTEM_URL.CHANGE_PASSWORD}`, values).then();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          {t('users:button.reset_pass')}
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
                    disabled
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
                    name="newPassword"
                    tag={Field}
                    placeholder={t('common:field.input_data')}
                    value={values.newPassword}
                    invalid={!!(touched.newPassword && errors.newPassword)}
                  />
                  <FormFeedback>{errors.newPassword}</FormFeedback>
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

export default MResetPassUser;
