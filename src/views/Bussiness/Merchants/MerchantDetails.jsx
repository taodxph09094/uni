import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BaseAdminContainer from '../../../components/BaseAdminContainer';
import { Badge, Button, Card, CardBody, Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';
import { RouteBase } from '../../../constants/routeUrl';
import { useGetData } from '../../../hooks/services/useGetApi';
import { BUSINESS_URL } from '../../../constants/api';
import CustomDataTable from '../../../components/Core/CustomDataTable';
import { Link } from 'react-router-dom';
import MUpdateMerchant from './MUpdateMerchant';
import CreateOwner from './Owners/CreateOwner';
import CreateStaff from './Staff/CreateStaff';
import Panels from '../../../components/Core/Panels';
import * as classnames from 'classnames';

const MerchantDetails = (props) => {
  const initParams = {
    page: 0,
    size: 20,
  };
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('1');
  const [activeTabProduct, setActiveTabProduct] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const toggleProduct = (tab) => {
    if (activeTabProduct !== tab) {
      setActiveTabProduct(tab);
    }
  };
  const ownerColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: t('merchantDetails:table.fullName'),
      selector: (row) => row.givenName + ' ' + row.surname,
      sortable: true,
    },
    {
      name: t('merchantDetails:table.phone'),
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: t('merchantDetails:table.email'),
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: t('merchantDetails:table.status'),
      cell: (row) => {
        return (
          <Badge color={row.enabled ? 'success' : 'danger'}>
            {row.enabled ? t('merchantDetails:table.status.enable') : t('merchantDetails:table.status.disable')}
          </Badge>
        );
      },
      sortable: true,
    },
    {
      name: t('merchantDetails:table.action'),
      cell: (row) => {
        return (
          <Badge color={row.disabled ? 'success' : 'danger'}>
            {row.disabled ? t('merchantDetails:table.action.enable') : t('merchantDetails:table.action.disable')}
          </Badge>
        );
      },
      sortable: true,
    },
  ];

  const staffColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: t('merchantDetails:table.staffName'),
      selector: (row) => row.givenName + ' ' + row.surname,
      sortable: true,
    },
    {
      name: t('merchantDetails:table.phone'),
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: t('merchantDetails:table.email'),
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: t('merchantDetails:table.status'),
      cell: (row) => {
        return (
          <Badge color={row.enabled ? 'success' : 'danger'}>
            {row.enabled ? t('merchantDetails:table.status.enable') : t('merchantDetails:table.status.disable')}
          </Badge>
        );
      },
      sortable: true,
    },
    {
      name: t('merchantDetails:table.action'),
      cell: (row) => {
        return (
          <Badge color={row.disabled ? 'success' : 'danger'}>
            {row.disabled ? t('merchantDetails:table.action.enable') : t('merchantDetails:table.action.disable')}
          </Badge>
        );
      },
      sortable: true,
    },
  ];

  const posColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: t('pos:field.name'),
      selector: (row) => {
        return <Link to={`/admin${RouteBase.MerchantDetails}?id=${row?.id}`}>{row.name}</Link>;
      },
      sortable: true,
    },
    {
      name: t('merchantDetails:table.status'),
      cell: (row) => {
        return (
          <Badge color={row.status ? 'success' : 'danger'}>
            {row.status ? t('merchantDetails:table.status.enable') : t('merchantDetails:table.status.disable')}
          </Badge>
        );
      },
      sortable: true,
    },
    {
      name: t('pos:field.school'),
      selector: (row) => row.schoolName,
      sortable: true,
    },
    {
      name: t('pos:field.canteen'),
      selector: (row) => row.canteenName,
      sortable: true,
    },
  ];

  const productColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: t('merchantDetails:field.productName'),
      selector: (row) => {
        return <Link to={`/admin${RouteBase.MerchantDetails}?id=${row?.id}`}>{row.name}</Link>;
      },
      sortable: true,
    },
    {
      name: t('merchantDetails:table.status'),
      cell: (row) => {
        return (
          <Badge color={row.enabled ? 'success' : 'danger'}>
            {row.enabled ? t('merchantDetails:table.status.active') : t('merchantDetails:table.status.disable')}
          </Badge>
        );
      },
      sortable: true,
    },
    {
      name: t('merchantDetails:field.price'),
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: t('merchantDetails:field.action'),
      cell: (row) => {
        return (
          <Badge style={{ cursor: 'pointer' }} color={'danger'}>
            {t('merchantDetails:table.action.delete')}
          </Badge>
        );
      },
      sortable: true,
    },
  ];

  const history = useHistory();
  const back = () => {
    history.push('/admin' + RouteBase.Merchants);
  };

  const id = new URLSearchParams(props.location.search).get('id');
  const [paramRequest, setParamRequest] = useState(initParams);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenCreateOwner, setModalOpenCreateOwner] = useState(false);
  const [modalOpenCreateStaff, setModalOpenCreateStaff] = useState(false);
  const [updated, setUpdated] = useState(false);
  const getMerchantDetails = useGetData(BUSINESS_URL.GET_MERCHANT_DETAILS + id) || null;
  const getMerchantOwners = useGetData(BUSINESS_URL.GET_MERCHANT_DETAILS + id + BUSINESS_URL.GET_OWNERS, initParams);
  const getMerchantStaffs = useGetData(BUSINESS_URL.GET_MERCHANT_DETAILS + id + BUSINESS_URL.GET_STAFFS, initParams);
  const getMerchantPos = useGetData(BUSINESS_URL.GET_MERCHANT_DETAILS + id + BUSINESS_URL.GET_LIST_POS);
  const getPosList = useGetData(BUSINESS_URL.GET_LIST_POS);
  const getMerchantBestSeller = useGetData(
    BUSINESS_URL.GET_MERCHANT_DETAILS + id + BUSINESS_URL.GET_LIST_BESTSELLER,
    initParams,
  );
  const getMerchantAllCategories = useGetData(BUSINESS_URL.GET_MERCHANT_DETAILS + id + BUSINESS_URL.GET_ALL_CATEGORIES);

  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getMerchantDetails._getData(null);
    }
    return () => {
      isCurrent = false;
    };
  }, [updated]);

  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getMerchantOwners._getData(null, paramRequest);
    }
    return () => {
      isCurrent = false;
    };
  }, [paramRequest]);

  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getMerchantStaffs._getData(null, paramRequest);
    }
    return () => {
      isCurrent = false;
    };
  }, [paramRequest]);

  function openModalMerchant() {
    setModalOpen(!modalOpen);
  }
  function openModalCreateOwner() {
    setModalOpenCreateOwner(!modalOpenCreateOwner);
  }
  function openModalCreateStaff() {
    setModalOpenCreateStaff(!modalOpenCreateStaff);
  }
  function refreshPage() {
    setUpdated(!updated);
  }

  function refreshTable() {
    setParamRequest({ ...paramRequest, page: 0 });
  }
  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0 mt-5">
          <Panels>
            <div className="d-flex">
              <h1>{getMerchantDetails?.data?.name || ''}</h1>
              <Button className="ml-auto" color="primary" onClick={openModalMerchant}>
                {t('merchant:button.update')}
              </Button>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('merchantDetails:field.address')}: </span>
                {getMerchantDetails?.data?.address || ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('merchantDetails:field.phone')}: </span>
                {getMerchantDetails?.data?.phone || ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('merchantDetails:field.email')}: </span>
                {getMerchantDetails?.data?.email || ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('merchantDetails:field.enabled')}: </span>

                <Badge color={getMerchantDetails?.data?.enabled ? 'success' : 'danger'}>
                  {getMerchantDetails?.data?.enabled
                    ? t('merchantDetails:field.enabled.enable')
                    : t('merchantDetails:field.enabled.disable')}
                </Badge>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('merchantDetails:field.create_at')}: </span>
                {getMerchantDetails?.data?.createdDate
                  ? moment(getMerchantDetails?.data?.createdDate).format('DD/MM/YYYY HH:MM')
                  : ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('merchantDetails:field.last_modified_at')}: </span>
                {getMerchantDetails?.data?.lastModifiedDate
                  ? moment(getMerchantDetails?.data?.lastModifiedDate).format('DD/MM/YYYY HH:MM')
                  : ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('merchantDetails:field.creator')}: </span>
                {getMerchantDetails?.data?.createdBySurname + ' ' + getMerchantDetails?.data?.createdByGivenName || ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('merchantDetails:field.modified')}: </span>
                {getMerchantDetails?.data?.lastModifiedBySurname +
                  ' ' +
                  getMerchantDetails?.data?.lastModifiedByGivenName || ''}
              </div>
            </div>
          </Panels>
        </Card>
        <MUpdateMerchant
          isUpdate={true}
          formValue={getMerchantDetails?.data}
          isOpen={modalOpen}
          setModalOpen={setModalOpen}
          refreshParent={refreshPage}
        />
        <br />

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => toggle('1')}
              style={{ cursor: 'pointer' }}
            >
              {t('merchantDetails:field.shop_master')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => toggle('2')}
              style={{ cursor: 'pointer' }}
            >
              {t('merchantDetails:field.staff')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => toggle('3')}
              style={{ cursor: 'pointer' }}
            >
              {t('merchantDetails:field.pos')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => toggle('4')}
              style={{ cursor: 'pointer' }}
            >
              {t('merchantDetails:field.products')}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="tabs-table" activeTab={activeTab}>
          <TabPane tabId="1">
            <Card className="bg-secondary shadow border-0 mt-4">
              <div className="d-flex">
                <h3>{t('merchantDetails:field.owner_list')}</h3>
                <Button className="ml-auto" color="primary" onClick={openModalCreateOwner}>
                  {t('merchant:button.create')}
                </Button>
              </div>
              <div className="form-group">
                <CustomDataTable
                  data={getMerchantOwners?.data}
                  columns={ownerColumns}
                  progressPending={getMerchantOwners?.isLoading}
                />
              </div>
            </Card>
            <CreateOwner
              isOpen={modalOpenCreateOwner}
              setModalOpen={setModalOpenCreateOwner}
              refreshParent={refreshTable}
            />
          </TabPane>
          <TabPane tabId="2">
            <Card className="bg-secondary shadow border-0 mt-4">
              <div className="d-flex">
                <h3>{t('merchantDetails:field.staff_list')}</h3>
                <Button className="ml-auto" color="primary" onClick={openModalCreateStaff}>
                  {t('merchant:button.create')}
                </Button>
              </div>
              <div className="form-group">
                <CustomDataTable
                  data={getMerchantStaffs?.data}
                  columns={staffColumns}
                  progressPending={getMerchantStaffs?.isLoading}
                />
              </div>
            </Card>
            <CreateStaff
              isOpen={modalOpenCreateStaff}
              setModalOpen={setModalOpenCreateStaff}
              refreshParent={refreshTable}
              posId={getPosList?.data?.data}
            />
          </TabPane>
          <TabPane tabId="3">
            <Card className="bg-secondary shadow border-0 mt-4">
              <div className="form-group">
                <CustomDataTable
                  data={getMerchantPos?.data}
                  columns={posColumns}
                  progressPending={getMerchantPos?.isLoading}
                />
              </div>
            </Card>
          </TabPane>
          <TabPane tabId="4">
            <Card className="bg-secondary shadow border-0 mt-4">
              <div className="form-group">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTabProduct === '1' })}
                      onClick={() => toggleProduct('1')}
                      style={{ cursor: 'pointer' }}
                    >
                      {t('merchantDetails:field.bestSale')}
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTabProduct}>
                  <TabPane tabId="1">
                    <Card className="bg-secondary shadow border-0 mt-4">
                      <div className="d-flex">
                        <Button className="ml-auto" color="primary" onClick={openModalCreateStaff}>
                          {t('merchantDetails:button.add_bestSale')}
                        </Button>
                      </div>
                      <div className="form-group">
                        <CustomDataTable
                          data={getMerchantBestSeller?.data}
                          columns={productColumns}
                          progressPending={getMerchantBestSeller?.isLoading}
                        />
                      </div>
                    </Card>
                  </TabPane>
                </TabContent>
              </div>
            </Card>
          </TabPane>
        </TabContent>

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

export default MerchantDetails;
