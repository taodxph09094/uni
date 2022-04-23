import React from 'react';
import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { usePostData } from 'hooks/services/usePostApi';
import { useGetData } from 'hooks/services/useGetApi';
import { BUSINESS_URL } from 'constants/api';
import { convertToFormSelect } from '../../../../helpers';
import SelectboxField from 'components/CustomField/SelectboxField';
const CreateStaff = (props) => {
  const { formValue, isOpen, setModalOpen, refreshParent, posId } = props;
  const { t } = useTranslation();
  const formInitValue = {
    id: formValue?.id || '',
    fullName: formValue?.fullName || '',
    email: formValue?.email || '',
    password: formValue?.password || '',
    phone: formValue?.phone || '',
    posId: formValue?.posId || '',
    username: formValue?.username || '',
  };
  const createStaff = usePostData(null, null, true, null, false, false);
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(t('merchant:validate.fullName') + t('merchant:field.fullName')),
    email: Yup.string().required(t('merchant:validate.required') + t('merchant:field.email')),
    password: Yup.string().required(t('merchant:validate.required') + t('merchant:field.password')),
    phone: Yup.string().required(t('merchant:validate.required') + t('merchant:field.phone')),
    posId: Yup.string().required(t('merchant:validate.required') + t('merchant:field.email')),
    username: Yup.string().required(t('merchant:validate.required') + t('merchant:field.username')),
  });

  const onConfirm = async (values) => {
    console.log(values);
    await createStaff._postData(`${BUSINESS_URL.GET_LIST_MERCHANT}/${values.id}${BUSINESS_URL.POST_STAFF}`, values);
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
                  <Label>{t('merchant:field.staffName')}&nbsp;</Label>
                  <Input
                    name="fullName"
                    tag={Field}
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
                    placeholder={t('merchant:placeholder.usename')}
                    invalid={!!(touched.password && errors.password)}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Poin of sale&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Field
                    name="posId"
                    placeholder={t('common:field.choose')}
                    data={convertToFormSelect(posId ?? [], 'name', 'id', true, t('pos:field.selectDefault'))}
                    component={SelectboxField}
                  />
                  <FormFeedback>{errors.posId}</FormFeedback>
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

export default CreateStaff;
