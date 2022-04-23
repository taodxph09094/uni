import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useGetData } from '../../../hooks/services/useGetApi';
import { SYSTEM_URL } from '../../../constants/api';
import BaseAdminContainer from '../../../components/BaseAdminContainer';
import { Button, Card, CardBody, Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import * as moment from 'moment';
import { useHistory } from 'react-router-dom';
import { RouteBase } from '../../../constants/routeUrl';
import CustomDataTable from '../../../components/Core/CustomDataTable';
import { usePostData } from '../../../hooks/services/usePostApi';
import { alertService } from '../../../services/alertService';
import expandComponent from './ExpandChildComp';

const UserGroupDetails = (props) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('1');

  const id = new URLSearchParams(props.location.search).get('id');
  const getGroupDetails = useGetData(SYSTEM_URL.GET_LIST_GROUPS + '/' + id);
  const getPermissions = useGetData(SYSTEM_URL.GET_LIST_PERMISSIONS);
  const getMenus = useGetData(SYSTEM_URL.GET_LIST_MENUS);
  const getAllowedMenus = useGetData(null, null, true, null, null);
  const getAllowedPermission = useGetData(SYSTEM_URL.GET_LIST_GROUPS + '/' + id + SYSTEM_URL.PERMISSIONS);

  const tableColumnsMenu = [
    {
      name: t('users:table.func_name'),
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: t('users:table.code'),
      selector: (row) => row.code,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <>
            <label className="custom-toggle custom-toggle">
              <input
                type="checkbox"
                defaultChecked={initCheckedMenu(row)}
                onClick={(event) => changeAccessFunc(event, row)}
              />
              <span className="custom-toggle-slider rounded-circle" />
            </label>
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: t('common:table.action'),
    },
  ];

  const tableColumnsPermission = [
    {
      name: 'No.',
      selector: (row, i) => ++i,
      sortable: true,
    },
    {
      name: t('users:table.group_func'),
      selector: (row) => row.permissionGroup,
      sortable: true,
    },
    {
      name: t('users:table.code'),
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: t('users:table.action_name'),
      selector: (row) => row.name,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <>
            <label className="custom-toggle custom-toggle">
              <input
                type="checkbox"
                defaultChecked={initCheckedPermission(row)}
                onClick={(event) => changePermission(event, row)}
              />
              <span className="custom-toggle-slider rounded-circle" />
            </label>
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: t('common:table.action'),
    },
  ];

  useEffect(() => {
    void getAllowedMenus._getData(SYSTEM_URL.GET_LIST_GROUPS + '/' + id + SYSTEM_URL.ALLOWED_MENUS);
  }, []);

  const history = useHistory();
  const back = () => {
    history.push('/admin' + RouteBase.UserGroup);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // --------------- Send request -----------------------

  const requestFail = (val) => {
    alertService.error(val?.data?.message);
  };

  const postAddMenuSuccess = () => {
    alertService.success(t('users:alert.add_menu'));
  };
  const postUnlinkMenuSuccess = () => {
    alertService.success(t('users:alert.remove_menu'));
  };

  const postAddMenus = usePostData(null, true, null, null, null, postAddMenuSuccess, requestFail);
  const postUnlinkMenu = usePostData(null, true, null, null, null, postUnlinkMenuSuccess, requestFail);

  const postAddPermissionSuccess = () => {
    alertService.success(t('users:alert.add_permission'));
  };
  const postUnlinkPermissionSuccess = () => {
    alertService.success(t('users:alert.remove_permission'));
  };

  const postAddPermissions = usePostData(null, true, null, null, null, postAddPermissionSuccess, requestFail);
  const postUnlinkPermissions = usePostData(null, true, null, null, null, postUnlinkPermissionSuccess, requestFail);

  const changeAccessFunc = (e, value) => {
    if (e.target?.checked) {
      void postAddMenus._postData(`${SYSTEM_URL.GET_LIST_GROUPS}/${id}${SYSTEM_URL.ADD_MENUS}`, {
        menuIds: [value.id],
      });
    } else {
      void postUnlinkMenu._postData(`${SYSTEM_URL.GET_LIST_GROUPS}/${id}${SYSTEM_URL.UNLINK_MENU}`, {
        menuId: value.id,
      });
    }
  };

  const changePermission = (e, value) => {
    if (e.target?.checked) {
      void postAddPermissions._postData(`${SYSTEM_URL.GET_LIST_GROUPS}/${id}${SYSTEM_URL.ADD_PERMISSIONS}`, {
        permissionIds: [value.id],
      });
    } else {
      void postUnlinkPermissions._postData(`${SYSTEM_URL.GET_LIST_GROUPS}/${id}${SYSTEM_URL.UNLINK_PERMISSIONS}`, {
        permissionIds: [value.id],
      });
    }
  };

  // ---------------End send request -----------------------

  const initCheckedMenu = (value) => {
    if (getAllowedMenus?.data?.length && !getAllowedMenus.isLoading) {
      return !!getAllowedMenus?.data?.find((e) => e?.id === value?.id);
    }
  };

  const initCheckedPermission = (value) => {
    if (getAllowedPermission?.data?.length && !getAllowedPermission.isLoading) {
      return !!getAllowedPermission?.data?.find((e) => e?.id === value?.id);
    }
  };

  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0 mt-5">
          <CardBody>
            <div className="row form-group mt-2">
              <h1 className="col-sm-12">{getGroupDetails?.data?.name || ''}</h1>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:table.group_name')}: </span>
                {getGroupDetails?.data?.name || ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.type')}: </span>
                {getGroupDetails?.data?.userType || ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:table.describe')}: </span>
                {getGroupDetails?.data?.description || ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.create_date')}: </span>
                {getGroupDetails?.data?.createdDate
                  ? moment(getGroupDetails?.data?.createdDate).format('DD/MM/YYYY HH:mm')
                  : ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.create_by')}: </span>
                {getGroupDetails?.data?.createdBySurname + ' ' + getGroupDetails?.data?.createdByGivenName || ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.update_date')}: </span>
                {getGroupDetails?.data?.lastModifiedDate
                  ? moment(getGroupDetails?.data?.lastModifiedDate).format('DD/MM/YYYY HH:mm')
                  : ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.update_by')}: </span>
                {getGroupDetails?.data?.lastModifiedBySurname + ' ' + getGroupDetails?.data?.lastModifiedByGivenName ||
                  ''}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary shadow border-0 mt-4">
          <div className="form-group">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={{ active: activeTab === '1' }}
                  onClick={() => toggle('1')}
                  style={{ cursor: 'pointer' }}
                >
                  {t('users:field.access_func')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={{ active: activeTab === '2' }}
                  onClick={() => toggle('2')}
                  style={{ cursor: 'pointer' }}
                >
                  {t('users:field.permission')}
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Card>
                  <CardBody>
                    <CustomDataTable
                      data={getMenus?.data}
                      columns={tableColumnsMenu}
                      progressPending={getMenus?.isLoading}
                      expandableRows
                      expandableRowsComponent={expandComponent}
                      expandableRowsComponentProps={{
                        getAllowedMenus: getAllowedMenus,
                        changeFuncIsAccessed: changeAccessFunc,
                      }}
                    />
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="2">
                <Card>
                  <CardBody>
                    <CustomDataTable
                      data={getPermissions?.data}
                      columns={tableColumnsPermission}
                      progressPending={getPermissions?.isLoading}
                    />
                  </CardBody>
                </Card>
              </TabPane>
            </TabContent>
          </div>
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

export default UserGroupDetails;
