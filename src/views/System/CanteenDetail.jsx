import React, { useEffect, useState } from 'react';
import { useGetData } from '../../hooks/services/useGetApi';
import { TRANSACTION_URL } from '../../constants/api';
import BaseAdminContainer from 'components/BaseAdminContainer';
import { Button, Card, Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Panels from '../../components/Core/Panels';
import * as moment from 'moment';
import { RouteBase } from '../../constants/routeUrl';
import { Link } from 'react-router-dom';
import MAddOrEditCanteen from './MAddOrEditCanteen';

const CanteenDetail = (props) => {
  const { t } = useTranslation();
  const id = new URLSearchParams(props.location.search).get('id');
  const [modalOpen, setModalOpen] = useState(false);
  const [updated, setUpdated] = useState(false);

  const getCanteenById = useGetData(`${TRANSACTION_URL.GET_LIST_CANTEENS}/${id}`);
  const getSchoolList = useGetData(TRANSACTION_URL.GET_LIST_SCHOOL);

  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getCanteenById._getData(null);
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
              <h1>{getCanteenById?.data?.name}</h1>
              <Button className="ml-auto" color="primary" onClick={openUpdateModal}>
                {t('pos:button.update')}
              </Button>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6">
                <p>
                  <span className="font-weight-bold">{t('pos:field.school')}</span>:
                  <Link to={`/admin${RouteBase.SchoolDetail}?id=${getCanteenById?.data?.schoolId}`}>
                    {' '}
                    {getCanteenById?.data?.schoolName}
                  </Link>
                </p>
                <p>
                  <span className="font-weight-bold">Được tạo lúc</span>:{' '}
                  {moment(getCanteenById?.data?.createdDate).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>
                  <span className="font-weight-bold">Tạo bởi</span>:{' '}
                  {(getCanteenById?.data?.createdBySurname || '') +
                    ' ' +
                    (getCanteenById?.data?.createdByGivenName || '')}
                </p>
              </div>
              <div className="col-sm-6">
                <p>
                  <span className="font-weight-bold">{t('common:field.address')}</span>: {getCanteenById?.data?.address}
                </p>
                <p>
                  <span className="font-weight-bold">Sửa đổi gần nhất lúc</span>:{' '}
                  {moment(getCanteenById?.data?.lastModifiedDate).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>
                  <span className="font-weight-bold">Sửa đổi gần nhất bởi</span>:{' '}
                  {(getCanteenById?.data?.lastModifiedBySurname || '') +
                    ' ' +
                    (getCanteenById?.data?.lastModifiedByGivenName || '')}
                </p>
              </div>
            </div>
          </Panels>
        </Card>
        <MAddOrEditCanteen
          isUpdate={true}
          formValue={getCanteenById?.data}
          isOpen={modalOpen}
          setModalOpen={setModalOpen}
          refreshParent={refreshPage}
          schools={getSchoolList?.data?.data}
        />
      </Container>
    </BaseAdminContainer>
  );
};

export default CanteenDetail;
