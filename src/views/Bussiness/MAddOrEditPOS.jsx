import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { usePostData } from '../../hooks/services/usePostApi';
import { usePutData } from '../../hooks/services/usePutApi';
import { TRANSACTION_URL } from '../../constants/api';
import { convertToFormSelect } from '../../helpers';
import SelectboxField from '../../components/CustomField/SelectboxField';
import { CodeConstants } from '../../constants/ApiCode';
import { alertService } from '../../services/alertService';

const MAddOrEditPOS = (props) => {
  const { isUpdate, formValue, isOpen, setModalOpen, refreshParent, schools, merchants, canteens } = props;
  const { t } = useTranslation();

  const formInitValue = {
    id: formValue?.id || '',
    name: formValue?.name || '',
    merchantId: formValue?.merchantId || '',
    schoolIdModal: formValue?.schoolId || '',
    canteenId: formValue?.canteenId || '',
  };

  const createPOS = usePostData(null, true, null, false, false);
  const updatePOS = usePutData(null, true, null, false, false);

  useEffect(() => {
    if (createPOS.data) {
      if (createPOS.data.status === CodeConstants.success) {
        postSuccess();
      } else {
        postFailed();
      }
    }
    if (updatePOS.data) {
      if (updatePOS.data.status === CodeConstants.success) {
        postSuccess();
      } else {
        postFailed();
      }
    }
  }, [createPOS.data, updatePOS.data]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên' + t('common:validate.required')),
    merchantId: Yup.string().required(t('common:field.address') + t('common:validate.required')),
    schoolIdModal: Yup.string().required(t('pos:field.school') + t('common:validate.required')),
    canteenId: Yup.string().required(t('pos:field.school') + t('common:validate.required')),
  });

  const postSuccess = () => {
    alertService.success(`${isUpdate ? 'Cập nhật' : 'Thêm mới'} điểm bán thành công`);
  };

  const postFailed = () => {
    alertService.error(`${isUpdate ? 'Cập nhật' : 'Thêm mới'} điểm bán thất bại`);
  };

  const onConfirm = async (values) => {
    console.log(values);
    values.schoolId = values.schoolIdModal;
    if (isUpdate) {
      await updatePOS._putData(`${TRANSACTION_URL.GET_LIST_POS}/${values.id}`, values);
    } else {
      await createPOS._postData(TRANSACTION_URL.GET_LIST_POS, values);
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
                    Tên&nbsp;
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
                    Merchant&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Field
                    name="merchantId"
                    placeholder={t('common:field.choose')}
                    data={convertToFormSelect(merchants ?? [], 'name', 'id', true, t('pos:field.selectDefault'))}
                    component={SelectboxField}
                    disabled={isUpdate}
                  />
                  <FormFeedback>{errors.merchantId}</FormFeedback>
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
                  <FormFeedback>{errors.schoolIdModal}</FormFeedback>
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
                  <FormFeedback>{errors.canteenId}</FormFeedback>
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

export default MAddOrEditPOS;
