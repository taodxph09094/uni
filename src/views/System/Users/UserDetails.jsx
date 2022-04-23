import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useGetData } from '../../../hooks/services/useGetApi';
import { SYSTEM_URL } from '../../../constants/api';
import BaseAdminContainer from '../../../components/BaseAdminContainer';
import { Badge, Button, Card, CardBody, CardHeader, Container, PopoverBody, UncontrolledPopover } from 'reactstrap';
import * as moment from 'moment';
import CustomDataTable from '../../../components/Core/CustomDataTable';
import { useHistory } from 'react-router-dom';
import { RouteBase } from '../../../constants/routeUrl';
import MAddGroup from './Modal/MAddGroup';
import { usePutData } from '../../../hooks/services/usePutApi';
import { alertService } from '../../../services/alertService';

const UserDetails = (props) => {
  const { t } = useTranslation();
  const [modalAddGroupOpen, setModalAddGroupOpen] = useState(false);
  const id = new URLSearchParams(props.location.search).get('id');
  const getUserDetails = useGetData(SYSTEM_URL.GET_LIST_USER + '/' + id);
  const getUserGroups = useGetData(SYSTEM_URL.GET_LIST_USER + '/' + id + SYSTEM_URL.GROUP);
  const styleBtn = { color: '#f80031', cursor: 'pointer', fontSize: 30 };
  const idPopover = 'tooltip876279349';

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: t('users:table.group_name'),
      selector: (row) => row.name,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <>
            <i
              style={styleBtn}
              className="ni ni-fat-remove"
              title={t('users:button.remove_user_from_group')}
              id="tooltip876279349"
            />
            <UncontrolledPopover placement="right" target={idPopover}>
              <PopoverBody>
                <div>{t('users:field.confirm_delete_user_from_group')}</div>
                <div className="row">
                  <div className="col-sm-12 text-right">
                    <Button color="default" outline type="button" onClick={closePopover} size="sm">
                      {t('common:button.cancel')}
                    </Button>
                    <Button
                      color="primary"
                      type="button"
                      onClick={(event) => removeUserFromGroup(event, row)}
                      size="sm"
                    >
                      {t('common:button.ok')}
                    </Button>
                  </div>
                </div>
              </PopoverBody>
            </UncontrolledPopover>
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: t('common:table.action'),
    },
  ];

  const history = useHistory();
  const back = () => {
    history.push('/admin' + RouteBase.User);
  };

  const genStatus = (value) => {
    if (value) {
      return <Badge color="success">{t('users:table.active')}</Badge>;
    } else {
      return <Badge color="warning">{t('users:table.ban')}</Badge>;
    }
  };

  const getUserGroupNotLinks = useGetData(null, null, true, null, null);

  const openModal = async () => {
    await getUserGroupNotLinks._getData(SYSTEM_URL.GET_LIST_USER + '/' + id + SYSTEM_URL.NOT_LINKED_GROUP);
    await setModalAddGroupOpen(!modalAddGroupOpen);
  };

  const closePopover = () => {
    document.getElementById(idPopover).click();
  };

  const putSuccess = (val) => {
    if (val?.status + '' === '200') {
      alertService.success(t('users:alert.left_group_success'));
      void getUserGroups._getData();
      document.getElementById(idPopover).click();
    }
  };

  const putFail = (val) => {
    alertService.error(val?.data?.message);
  };

  const removeGroupFromUser = usePutData(null, true, null, false, false, putSuccess, putFail);

  const removeUserFromGroup = (e, row) => {
    removeGroupFromUser
      ._putData(`${SYSTEM_URL.GET_LIST_USER}/${id}${SYSTEM_URL.REMOVE_GROUP_FROM_USER}`, {
        groupId: row?.id,
      })
      .then();
  };

  const reFreshTable = () => {
    void getUserGroups._getData();
  };

  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0 mt-5">
          <CardBody>
            <div className="row form-group mt-2">
              <h1 className="col-sm-12">
                {t('users:field.user')}: {getUserDetails?.data?.surname + ' ' + getUserDetails?.data?.givenName || ''}
              </h1>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">ID: </span>
                {getUserDetails?.data?.id || ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.username')}: </span>
                {getUserDetails?.data?.username || ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.phone_number')}: </span>
                {getUserDetails?.data?.phone || ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">Email: </span>
                {getUserDetails?.data?.email || ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:table.time_zone')}: </span>
                {getUserDetails?.data?.timezone || ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:table.type')}: </span>
                {genStatus(getUserDetails?.data?.enabled)}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.create_date')}: </span>
                {getUserDetails?.data?.createdDate
                  ? moment(getUserDetails?.data?.createdDate).format('DD/MM/YYYY HH:mm')
                  : ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.create_by')}: </span>
                {getUserDetails?.data?.createdBySurname + ' ' + getUserDetails?.data?.createdByGivenName || ''}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.update_date')}: </span>
                {getUserDetails?.data?.lastModifiedDate
                  ? moment(getUserDetails?.data?.lastModifiedDate).format('DD/MM/YYYY HH:mm')
                  : ''}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">{t('users:field.update_by')}: </span>
                {getUserDetails?.data?.lastModifiedBySurname + ' ' + getUserDetails?.data?.lastModifiedByGivenName ||
                  ''}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary shadow border-0 mt-4">
          <CardHeader className="row panel-card-header-custom">
            <h1 className="font-weight-bold col-sm-3">{t('users:field.user_group')}</h1>
            <div className="col-sm-9 text-right">
              <Button color="primary" type="button" onClick={openModal}>
                {t('users:button.create_group')}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <CustomDataTable data={getUserGroups?.data} columns={columns} progressPending={getUserGroups?.isLoading} />
          </CardBody>
        </Card>
        <br />
        <div>
          <Button color="default" outline type="button" onClick={back}>
            <i className="ni ni-bold-left" /> {t('common:button.back')}
          </Button>
        </div>
        <MAddGroup
          isOpen={modalAddGroupOpen}
          setModalOpen={setModalAddGroupOpen}
          refreshParent={reFreshTable}
          userGroupNotLinks={getUserGroupNotLinks}
          id={id || ''}
        />
      </Container>
    </BaseAdminContainer>
  );
};

export default UserDetails;
