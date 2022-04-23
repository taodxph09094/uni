import React from 'react';
import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { usePostData } from '../../../hooks/services/usePostApi';
import { usePutData } from '../../../hooks/services/usePutApi';
import { BUSINESS_URL } from '../../../constants/api';
import { convertToFormSelect } from '../../../helpers';
import SelectboxField from '../../../components/CustomField/SelectboxField';

const MUpdateMerchant = (props) => {
  const { isUpdate, formValue, isOpen, setModalOpen, refreshParent, schools, merchants, canteens } = props;
  const { t } = useTranslation();

  const formInitValue = {
    id: formValue?.id || '',
    // defaultPos: {
    //   canteenId: formValue?.canteenId || '',
    //   name: formValue?.name || '',
    //   schoolId: formValue?.schoolId || '',
    // },
    name: formValue?.name || '',
    email: formValue?.email || '',
    phone: formValue?.phone || '',
    salesmanId: formValue?.salesmanId || '',
  };
  const createMerchant = usePostData(null, true, null, false, false);
  const updateMerchant = usePutData(null, true, null, false, false);

  const validationSchema = Yup.object().shape({
    // defaultPos: {
    //   canteenId: Yup.string().required(t('pos:field.school') + t('common:validate.required')),
    //   name: Yup.string().required(t('pos:field.name') + t('common:validate.required')),
    //   schoolId: Yup.string().required(t('pos:field.school') + t('common:validate.required')),
    // },
    name: Yup.string().required(t('merchant:validate.required') + t('merchant:field.merchant')),
    email: Yup.string().required(t('merchant:validate.required') + t('merchant:field.email')),
    phone: Yup.string().required(t('merchant:validate.required') + t('merchant:field.phone')),
  });

  const onConfirm = async (values) => {
    console.log(values);
    if (isUpdate) {
      await updateMerchant._putData(`${BUSINESS_URL.GET_LIST_MERCHANT}/${values.id}`, values);
    } else {
      await createMerchant._postData(BUSINESS_URL.GET_LIST_MERCHANT, values);
    }
    // call back to parent
    refreshParent();
  };
  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          {isUpdate ? t('merchant:button.update') : t('merchant:button.add')}
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
                    {t('merchant:field.merchant')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="name"
                    tag={Field}
                    placeholder={t('merchant:placeholder.name')}
                    invalid={!!(touched.name && errors.name)}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
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
                    {t('post:field.name')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="name"
                    tag={Field}
                    placeholder={t('pos:placeholder.school')}
                    invalid={!!(touched.defaultPos.name && errors.defaultPos.name)}
                  />
                  <FormFeedback>{errors.defaultPos.name}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    {t('pos:field.school')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Field
                    name="schoolIdModal"
                    placeholder={t('common:field.choose')}
                    data={convertToFormSelect(schools ?? [], 'name', 'id', true, t('pos:field.selectDefault'))}
                    component={SelectboxField}
                  />
                  <FormFeedback>{errors.defaultPos.schoolId}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    {t('pos:field.canteen')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Field
                    name="canteenId"
                    placeholder={t('common:field.choose')}
                    data={convertToFormSelect(canteens ?? [], 'name', 'id', true, t('pos:field.selectDefault'))}
                    component={SelectboxField}
                  />
                  <FormFeedback>{errors.defaultPos.canteenId}</FormFeedback>
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

export default MUpdateMerchant;
