import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { usePostData } from '../../hooks/services/usePostApi';
import { usePutData } from '../../hooks/services/usePutApi';
import { TRANSACTION_URL } from '../../constants/api';
import { alertService } from '../../services/alertService';
import { CodeConstants } from '../../constants/ApiCode';

const MAddOrEditSchool = (props) => {
  const { isUpdate, formValue, isOpen, setModalOpen, refreshParent } = props;
  const { t } = useTranslation();

  const formInitValue = {
    id: formValue?.id || '',
    name: formValue?.name || '',
    address: formValue?.address || '',
  };

  const createSchool = usePostData(null, true, null, false, false);
  const updateSchool = usePutData(null, true, null, false, false);

  useEffect(() => {
    if (createSchool.data) {
      if (createSchool.data.status === CodeConstants.success) {
        postSuccess();
      } else {
        postFailed();
      }
    }
    if (updateSchool.data) {
      if (updateSchool.data.status === CodeConstants.success) {
        postSuccess();
      } else {
        postFailed();
      }
    }
  }, [createSchool.data, updateSchool.data]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('pos:field.school') + t('common:validate.required')),
    address: Yup.string().required(t('common:field.address') + t('common:validate.required')),
  });

  const postSuccess = () => {
    alertService.success(`${isUpdate ? 'Cập nhật' : 'Thêm mới'} điểm trường thành công`);
  };

  const postFailed = () => {
    alertService.error(`${isUpdate ? 'Cập nhật' : 'Thêm mới'} điểm trường thất bại`);
  };

  const onConfirm = async (values) => {
    console.log(values);
    const payload = {
      ...values,
      latitude: 0,
      longitude: 0,
    };
    console.log('payload', payload);
    if (isUpdate) {
      await updateSchool._putData(`${TRANSACTION_URL.GET_LIST_SCHOOL}/${values.id}`, payload);
    } else {
      await createSchool._postData(TRANSACTION_URL.GET_LIST_SCHOOL, payload);
    }
    // call back to parent
    refreshParent();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          {isUpdate ? t('pos:button.update') : t('pos:button.add')}
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
                    {t('pos:field.school')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="name"
                    tag={Field}
                    placeholder={t('pos:placeholder.school')}
                    invalid={!!(touched.name && errors.name)}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    {t('common:field.address')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="address"
                    tag={Field}
                    placeholder={t('pos:placeholder.school')}
                    invalid={!!(touched.address && errors.address)}
                  />
                  <FormFeedback>{errors.address}</FormFeedback>
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

export default MAddOrEditSchool;
