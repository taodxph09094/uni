import { Button, Modal, ModalBody, Row } from 'reactstrap';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SYSTEM_URL } from '../../../../constants/api';
import CustomDataTable from '../../../../components/Core/CustomDataTable';
import { usePutData } from '../../../../hooks/services/usePutApi';
import { alertService } from '../../../../services/alertService';

const MAddGroup = (props) => {
  const { id, userGroupNotLinks, isOpen, setModalOpen, refreshParent } = props;
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState([]);
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
  ];

  const putSuccess = (val) => {
    if (val?.status + '' === '200') {
      alertService.success(val.statusText || t('users:alert.add_group_success'));
    }

    // close modal
    setModalOpen(false);

    // call back to parent
    refreshParent();
  };

  const putFail = (val) => {
    alertService.error(val?.data?.message);
  };

  const putIdsUser = usePutData(null, true, null, false, false, putSuccess, putFail);

  const onConfirm = () => {
    const ids = selectedRows.map((e) => {
      return e?.id;
    });
    void putIdsUser._putData(`${SYSTEM_URL.GET_LIST_USER}/${id}${SYSTEM_URL.ADD_GROUP_TO_USER}`, { groupIds: ids });
  };

  const onRowSelect = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          {t('users:button.create_group')}
        </h3>
        <button aria-label="Close" className="close" type="button" onClick={() => setModalOpen(false)}>
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <CustomDataTable
          data={userGroupNotLinks?.data}
          columns={columns}
          progressPending={userGroupNotLinks?.isLoading}
          pagination
          paginationServer={false}
          paginationTotalRows={userGroupNotLinks?.data?.pagination?.totalRecords ?? 0}
          selectableRows
          onSelectedRowsChange={onRowSelect}
        />
        <Row>
          <div className="col-sm-12 text-right">
            <Button color="default" outline type="button" onClick={() => setModalOpen(false)}>
              {t('common:button.cancel')}
            </Button>
            <Button color="primary" type="button" onClick={onConfirm}>
              {t('common:button.ok')}
            </Button>
          </div>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default MAddGroup;
