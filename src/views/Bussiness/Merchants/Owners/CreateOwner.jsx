import React from 'react';
import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { usePostData } from 'hooks/services/usePostApi';
import { BUSINESS_URL } from 'constants/api';

const CreateOwner = (props) => {
  const { isUpdate, formValue, isOpen, setModalOpen, refreshParent } = props;
  const { t } = useTranslation();

  const formInitValue = {
    id: formValue?.id || '',
    fullName: formValue?.fullName || '',
    email: formValue?.email || '',
    password: formValue?.password || '',
    phone: formValue?.phone || '',
    username: formValue?.username || '',
  };
  const createOwner = usePostData(null, null, true, null, false, false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t('merchant:validate.required') + t('merchant:field.email')),
    fullName: Yup.string().required(t('merchant:validate.required') + t('merchant:field.fullname')),
    password: Yup.string().required(t('merchant:validate.required') + t('merchant:field.phone')),
    phone: Yup.string().required(t('merchant:validate.required') + t('merchant:field.phone')),
    username: Yup.string().required(t('merchant:validate.required') + t('merchant:field.phone')),
  });

  const onConfirm = async (values) => {
    console.log(values);
    await createOwner._postData(`${BUSINESS_URL.GET_LIST_MERCHANT}/${values.id}${BUSINESS_URL.POST_OWNERS}`, values);
    refreshParent();
  };
  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          {t('merchant:button.add')}
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
                  <Label>{t('merchant:field.fullname')}&nbsp;</Label>
                  <Input
                    name="fullName"
                    tag={Field}
                    value={values.fullName}
                    placeholder={t('merchant:placeholder.phone')}
                    invalid={!!(touched.fullName && errors.fullName)}
                  />
                  <FormFeedback>{errors.fullName}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>{t('merchant:field.phone')}&nbsp;</Label>
                  <Input
                    name="phone"
                    tag={Field}
                    value={values.phone}
                    placeholder={t('merchant:placeholder.phone')}
                    invalid={!!(touched.phone && errors.phone)}
                  />
                  <FormFeedback>{errors.phone}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>{t('merchant:field.email')}&nbsp;</Label>
                  <Input
                    name="email"
                    tag={Field}
                    value={values.email}
                    placeholder={t('merchant:placeholder.email')}
                    invalid={!!(touched.email && errors.email)}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    {t('merchant:field.usename')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="username"
                    tag={Field}
                    value={values.username}
                    placeholder={t('merchant:placeholder.usename')}
                    invalid={!!(touched.username && errors.username)}
                  />
                  <FormFeedback>{errors.username}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    {t('merchant:field.password')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="password"
                    type="password"
                    tag={Field}
                    value={values.password}
                    placeholder={t('merchant:placeholder.usename')}
                    invalid={!!(touched.password && errors.password)}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
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

export default CreateOwner;
