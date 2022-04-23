import React, { useEffect, useState } from 'react';
import { useGetData } from '../../hooks/services/useGetApi';
import { BUSINESS_URL, TRANSACTION_URL } from '../../constants/api';
import BaseAdminContainer from 'components/BaseAdminContainer';
import { Badge, Button, Card, CardBody, CardHeader, Container } from 'reactstrap';
import CustomDataTable from '../../components/Core/CustomDataTable';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RouteBase } from '../../constants/routeUrl';
import Panels from '../../components/Core/Panels';
import MAddOrEditPOS from './MAddOrEditPOS';
import * as moment from 'moment';
import { usePutData } from '../../hooks/services/usePutApi';
import { usePostData } from '../../hooks/services/usePostApi';
import MLinkProduct from './MLinkProduct';

const PointOfSalesDetail = (props) => {
  const { t } = useTranslation();

  const initParams = {
    page: 0,
    size: 20,
  };
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '30px',
    },
    {
      name: 'Sản phẩm',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: t('pos:field.status'),
      cell: (row) => {
        return (
          <Badge color={row.enabled ? 'success' : 'danger'}>
            {row.enabled ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}
          </Badge>
        );
      },
      sortable: true,
    },
    {
      name: 'Giá',
      selector: (row) => row.price?.toLocaleString('en-US') || 0,
      sortable: true,
      maxWidth: '150px',
    },
    {
      name: t('common:table.action'),
      cell: (row) => {
        return (
          <i
            title="Bỏ sản phẩm ra khỏi POS"
            className="ni ni-curved-next text-danger"
            style={{ cursor: 'pointer' }}
            onClick={() => unlinkProduct(row.id)}
          />
        );
      },
      maxWidth: '150px',
      sortable: true,
    },
  ];
  const id = new URLSearchParams(props.location.search).get('id');
  const [paramRequest, setParamRequest] = useState(initParams);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProdOpen, setModalProdOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const getPOSById = useGetData(`${TRANSACTION_URL.GET_LIST_POS}/${id}`);
  const getSchoolList = useGetData(TRANSACTION_URL.GET_LIST_SCHOOL);
  const getMerchantList = useGetData(BUSINESS_URL.GET_LIST_MERCHANT);
  const getCanteenList = useGetData(TRANSACTION_URL.GET_LIST_CANTEENS);
  const getNotLinkedProductsList = useGetData(`${TRANSACTION_URL.GET_LIST_POS}/${id}/notLinkedProducts`);
  const unLinkProduct = usePostData(null, true, null, null, false);
  const getBestSellerProductsList = useGetData(`${TRANSACTION_URL.GET_LIST_POS}/${id}/allProductsWithoutBestSeller`);
  const disablePOS = usePutData(`${TRANSACTION_URL.GET_LIST_POS}/${id}/disable`, true, null, null, false);
  const enablePOS = usePutData(`${TRANSACTION_URL.GET_LIST_POS}/${id}/enablePos`, true, null, null, false);

  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getPOSById._getData(null);
      void getBestSellerProductsList._getData(null);
      void getNotLinkedProductsList._getData(null);
    }
    return () => {
      isCurrent = false;
    };
  }, [updated, paramRequest]);

  function openUpdatePOS() {
    setModalOpen(!modalOpen);
  }

  async function changeStatusOfPOS(status) {
    if (status) {
      await disablePOS._putData();
    } else {
      await enablePOS._putData();
    }
    refreshPage();
  }

  function refreshPage() {
    setUpdated(!updated);
  }

  async function unlinkProduct(prodId) {
    await unLinkProduct._postData(`${TRANSACTION_URL.GET_LIST_POS}/${id}/unlinkProduct/${prodId}`);
    refreshPage();
  }

  function openLinkProductsModal() {
    setModalProdOpen(!modalProdOpen);
  }

  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="shadow">
          <Panels>
            <div className="d-flex">
              <h1>{getPOSById?.data?.name}</h1>
              <div className="ml-auto">
                <Button color="primary" onClick={openUpdatePOS}>
                  {t('pos:button.update')}
                </Button>
                <Button
                  className="ml-1"
                  color={getPOSById?.data?.status ? 'danger' : 'success'}
                  onClick={() => changeStatusOfPOS(!!getPOSById?.data?.status)}
                >
                  {getPOSById?.data?.status ? 'Ngừng hoạt động' : 'Hoạt động lại'}
                </Button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6">
                <p>
                  <span className="font-weight-bold">Trạng thái</span>:
                  <Badge color={getPOSById?.data?.status ? 'success' : 'danger'}>
                    {getPOSById?.data?.status ? t('pos:field.status.enable') : t('pos:field.status.disable')}
                  </Badge>
                </p>
                <p>
                  <span className="font-weight-bold">{t('pos:field.school')}</span>:
                  <Link to={`/admin${RouteBase.SchoolDetail}?id=${getPOSById?.data?.schoolId}`}>
                    {' '}
                    {getPOSById?.data?.schoolName}
                  </Link>
                </p>
                <p>
                  <span className="font-weight-bold">Được tạo lúc</span>:{' '}
                  {moment(getPOSById?.data?.createdDate).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>
                  <span className="font-weight-bold">Tạo bởi</span>:{' '}
                  {(getPOSById?.data?.createdBySurname || '') + ' ' + (getPOSById?.data?.createdByGivenName || '')}
                </p>
              </div>
              <div className="col-sm-6">
                <p>
                  <span className="font-weight-bold">Merchant</span>: {getPOSById?.data?.merchantName}
                </p>
                <p>
                  <span className="font-weight-bold">{t('pos:field.canteen')}</span>:
                  <Link to={`/admin${RouteBase.CanteenDetail}?id=${getPOSById?.data?.canteenId}`}>
                    {' '}
                    {getPOSById?.data?.canteenName}
                  </Link>
                </p>
                <p>
                  <span className="font-weight-bold">Sửa đổi gần nhất lúc</span>:{' '}
                  {moment(getPOSById?.data?.lastModifiedDate).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>
                  <span className="font-weight-bold">Sửa đổi gần nhất bởi</span>:{' '}
                  {(getPOSById?.data?.lastModifiedBySurname || '') +
                    ' ' +
                    (getPOSById?.data?.lastModifiedByGivenName || '')}
                </p>
              </div>
            </div>
          </Panels>
        </Card>
        <Card className="shadow mt-3">
          <CardHeader>
            <div className="d-flex">
              <Button color="primary" className="ml-auto" onClick={openLinkProductsModal}>
                Gán sản phẩm
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <CustomDataTable
              data={getBestSellerProductsList?.data}
              columns={columns}
              progressPending={getBestSellerProductsList?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={getBestSellerProductsList?.data?.pagination?.totalRecords ?? 0}
              onChangeRowsPerPage={(val) => {
                setParamRequest({ ...paramRequest, size: val, page: 0 });
              }}
              onChangePage={(val) => {
                setParamRequest({ ...paramRequest, page: val - 1 });
              }}
            />
          </CardBody>
        </Card>
        <MAddOrEditPOS
          isUpdate={true}
          formValue={getPOSById?.data}
          isOpen={modalOpen}
          setModalOpen={setModalOpen}
          refreshParent={refreshPage}
          schools={getSchoolList?.data?.data}
          merchants={getMerchantList?.data?.data}
          canteens={getCanteenList?.data?.data}
        />
        <MLinkProduct
          isOpen={modalProdOpen}
          setModalOpen={setModalProdOpen}
          refreshParent={refreshPage}
          unlinkProducts={getNotLinkedProductsList}
          posId={id}
        />
      </Container>
    </BaseAdminContainer>
  );
};

export default PointOfSalesDetail;
