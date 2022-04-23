import React, { useEffect, useState } from 'react';
import { useGetData } from '../../hooks/services/useGetApi';
import { TRANSACTION_URL } from '../../constants/api';
import BaseAdminContainer from 'components/BaseAdminContainer';
import { Button, Card, Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Panels from '../../components/Core/Panels';
import MAddOrEditSchool from './MAddOrEditSchool';
import * as moment from 'moment';

const SchoolDetail = (props) => {
  const { t } = useTranslation();
  const id = new URLSearchParams(props.location.search).get('id');
  const [modalOpen, setModalOpen] = useState(false);
  const [updated, setUpdated] = useState(false);

  const getSchoolById = useGetData(`${TRANSACTION_URL.GET_LIST_SCHOOL}/${id}`);

  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getSchoolById._getData(null);
    }
    return () => {
      isCurrent = false;
    };
  }, [updated]);

  function openUpdateModal() {
    setModalOpen(!modalOpen);
  }

  function refreshPage() {
    setUpdated(!updated);
  }

  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="shadow">
          <Panels>
            <div className="d-flex">
              <h1>{getSchoolById?.data?.name}</h1>
              <Button className="ml-auto" color="primary" onClick={openUpdateModal}>
                {t('pos:button.update')}
              </Button>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6">
                <p>
                  <span className="font-weight-bold">{t('pos:field.school')}</span>: {getSchoolById?.data?.name}
                </p>
                <p>
                  <span className="font-weight-bold">Được tạo lúc</span>:{' '}
                  {moment(getSchoolById?.data?.createdDate).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>
                  <span className="font-weight-bold">Tạo bởi</span>:{' '}
                  {(getSchoolById?.data?.createdBySurname || '') +
                    ' ' +
                    (getSchoolById?.data?.createdByGivenName || '')}
                </p>
              </div>
              <div className="col-sm-6">
                <p>
                  <span className="font-weight-bold">{t('common:field.address')}</span>: {getSchoolById?.data?.address}
                </p>
                <p>
                  <span className="font-weight-bold">Sửa đổi gần nhất lúc</span>:{' '}
                  {moment(getSchoolById?.data?.lastModifiedDate).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>
                  <span className="font-weight-bold">Sửa đổi gần nhất bởi</span>:{' '}
                  {(getSchoolById?.data?.lastModifiedBySurname || '') +
                    ' ' +
                    (getSchoolById?.data?.lastModifiedByGivenName || '')}
                </p>
              </div>
            </div>
          </Panels>
        </Card>
        <MAddOrEditSchool
          isUpdate={true}
          formValue={getSchoolById?.data}
          isOpen={modalOpen}
          setModalOpen={setModalOpen}
          refreshParent={refreshPage}
        />
      </Container>
    </BaseAdminContainer>
  );
};

export default SchoolDetail;
