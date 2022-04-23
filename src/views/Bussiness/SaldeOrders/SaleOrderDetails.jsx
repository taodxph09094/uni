import { useTranslation } from 'react-i18next';
import React from 'react';
import { useGetData } from '../../../hooks/services/useGetApi';
import { BUSINESS_URL } from '../../../constants/api';
import BaseAdminContainer from '../../../components/BaseAdminContainer';
import { Button, Card, CardBody, Container } from 'reactstrap';
import * as moment from 'moment';
import CustomDataTable from '../../../components/Core/CustomDataTable';
import { numberWithCommas } from '../../../helpers';
import { useHistory } from 'react-router-dom';
import { RouteBase } from '../../../constants/routeUrl';

const SaleOrderDetails = (props) => {
  const { t } = useTranslation();

  const columns = [
    {
      name: t('saleOrderDetails:table.no'),
      selector: (row, i) => ++i,
      sortable: true,
    },
    {
      name: t('saleOrderDetails:table.product'),
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: t('saleOrderDetails:table.unit_price'),
      selector: (row) => numberWithCommas(row.unitPrice),
      sortable: true,
    },
    {
      name: t('saleOrderDetails:table.amount'),
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: t('saleOrderDetails:table.money'),
      selector: (row) => numberWithCommas(row.subTotal),
      sortable: true,
    },
    {
      name: t('saleOrderDetails:table.discount'),
      selector: (row) => row.discountAmount,
      sortable: true,
    },
    {
      name: t('saleOrderDetails:table.total_money'),
      selector: (row) => numberWithCommas(row.total),
      sortable: true,
    },
  ];

  const history = useHistory();
  const back = () => {
    history.push('/admin' + RouteBase.SaleOrders);
  };

  const id = new URLSearchParams(props.location.search).get('id');
  const getSaleOrderDetails = useGetData(BUSINESS_URL.GET_SALE_ORDER_DETAILS, { id: id }) || null;
  const getSaleOrderLine = useGetData(BUSINESS_URL.GET_LINE_SALE_ORDER + id + BUSINESS_URL.LINE);

  const genSum = () => {
    if (getSaleOrderLine?.data?.length) {
      return (
        <>
          <div className="row mb-3">
            <div className="col-sm-12 text-right">
              <span className="font-weight-bold">{t('saleOrderDetails:table.money')}:</span>{' '}
              {numberWithCommas(getSaleOrderDetails?.data?.subAmount)}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 text-right">
              <span className="font-weight-bold">{t('saleOrderDetails:table.ship')}:</span>{' '}
              {numberWithCommas(getSaleOrderDetails?.data?.shippingFee)}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 text-right">
              <span className="font-weight-bold">{t('saleOrderDetails:table.discount')}:</span>{' '}
              {getSaleOrderDetails?.data?.discountAmount}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-right">
              <span className="font-weight-bold">{t('saleOrderDetails:table.sum')}:</span>{' '}
              {numberWithCommas(getSaleOrderDetails?.data?.totalAmount)}
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0 mt-5">
          <CardBody>
            <div className="row form-group mt-2">
              <h1 className="col-sm-12">
                {t('saleOrderDetails:field.order')} {getSaleOrderDetails?.data?.code || ''}
              </h1>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('saleOrderDetails:field.code')}: </span>
                {getSaleOrderDetails?.data?.code || ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('saleOrderDetails:field.status')}: </span>
                {getSaleOrderDetails?.data?.statusDisplay || ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('saleOrderDetails:field.merchant')}: </span>
                {getSaleOrderDetails?.data?.merchantName || ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('saleOrderDetails:field.sale_point')}: </span>
                {getSaleOrderDetails?.data?.posName || ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('saleOrderDetails:field.pay_method')}: </span>
                {getSaleOrderDetails?.data?.paymentMethodName || ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('saleOrderDetails:field.sale_date')}: </span>
                {getSaleOrderDetails?.data?.saleDate
                  ? moment(getSaleOrderDetails?.data?.saleDate).format('DD/MM/YYYY HH:mm')
                  : ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('saleOrderDetails:field.create_date')}: </span>
                {getSaleOrderDetails?.data?.createdDate
                  ? moment(getSaleOrderDetails?.data?.createdDate).format('DD/MM/YYYY HH:mm')
                  : ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('saleOrderDetails:field.update_date')}: </span>
                {getSaleOrderDetails?.data?.createdDate
                  ? moment(getSaleOrderDetails?.data?.lastModifiedDate).format('DD/MM/YYYY HH:mm')
                  : ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('saleOrderDetails:field.create_by')}: </span>
                {getSaleOrderDetails?.data?.createdBySurname + ' ' + getSaleOrderDetails?.data?.createdByGivenName ||
                  ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('saleOrderDetails:field.sale_point')}: </span>
                {getSaleOrderDetails?.data?.lastModifiedBySurname +
                  ' ' +
                  getSaleOrderDetails?.data?.lastModifiedByGivenName || ''}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary shadow border-0 mt-4">
          <CardBody>
            <div className="form-group">
              <CustomDataTable
                data={getSaleOrderLine?.data}
                columns={columns}
                progressPending={getSaleOrderLine?.isLoading}
              />
            </div>
            {genSum()}
          </CardBody>
        </Card>
        <br />
        <div>
          <Button color="default" outline type="button" onClick={back}>
            <i className="ni ni-bold-left" /> {t('common:button.back')}
          </Button>
        </div>
      </Container>
    </BaseAdminContainer>
  );
};

export default SaleOrderDetails;
