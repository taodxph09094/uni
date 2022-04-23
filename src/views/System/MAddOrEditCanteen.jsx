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

const MAddOrEditCanteen = (props) => {
  const { isUpdate, formValue, isOpen, setModalOpen, refreshParent, schools } = props;
  const { t } = useTranslation();

  const formInitValue = {
    id: formValue?.id || '',
    name: formValue?.name || '',
    address: formValue?.address || '',
    schoolId: formValue?.schoolId || '',
  };

  const createCanteen = usePostData(null, true, null, false, false);
  const updateCanteen = usePutData(null, true, null, false, false);

  useEffect(() => {
    if (createCanteen.data) {
      if (createCanteen.data.status === CodeConstants.success) {
        postSuccess();
      } else {
        postFailed();
      }
    }
    if (updateCanteen.data) {
      if (updateCanteen.data.status === CodeConstants.success) {
        postSuccess();
      } else {
        postFailed();
      }
    }
  }, [createCanteen.data, updateCanteen.data]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('pos:field.canteen') + t('common:validate.required')),
    address: Yup.string().required(t('common:field.address') + t('common:validate.required')),
    schoolId: Yup.string().required(t('pos:field.school') + t('common:validate.required')),
  });

  const postSuccess = () => {
    alertService.success(`${isUpdate ? 'Cập nhật' : 'Thêm mới'} căng tin thành công`);
  };

  const postFailed = () => {
    alertService.error(`${isUpdate ? 'Cập nhật' : 'Thêm mới'} căng tin thất bại`);
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
      await updateCanteen._putData(`${TRANSACTION_URL.GET_LIST_CANTEENS}/${values.id}`, payload);
    } else {
      await createCanteen._postData(TRANSACTION_URL.GET_LIST_CANTEENS, payload);
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
                    {t('pos:field.canteen')}&nbsp;
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
                    {t('pos:field.school')}&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Field
                    name="schoolId"
                    placeholder={t('common:field.choose')}
                    data={convertToFormSelect(schools ?? [], 'name', 'id', true, t('pos:field.selectDefault'))}
                    component={SelectboxField}
                    disabled={isUpdate}
                  />
                  <FormFeedback>{errors.schoolId}</FormFeedback>
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

export default MAddOrEditCanteen;
