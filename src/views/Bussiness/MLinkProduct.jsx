import { Badge, Button, CardBody, Modal, ModalBody, ModalFooter } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePostData } from '../../hooks/services/usePostApi';
import CustomDataTable from '../../components/Core/CustomDataTable';
import { alertService } from '../../services/alertService';
import { TRANSACTION_URL } from '../../constants/api';
import { CodeConstants } from '../../constants/ApiCode';

const MLinkProduct = (props) => {
  const { isOpen, setModalOpen, refreshParent, unlinkProducts, posId } = props;
  const { t } = useTranslation();
  const initParams = {
    page: 0,
    size: 20,
  };

  const [paramRequest, setParamRequest] = useState(initParams);
  const [selectedProdIds, setSelectedProdIds] = useState([]);
  const linkProducts = usePostData(null, true, null, false, false);

  useEffect(() => {
    if (linkProducts.data) {
      if (linkProducts.data.status === CodeConstants.success) {
        postSuccess();
      } else {
        postFailed();
      }
    }
  }, [linkProducts.data]);

  const onConfirm = async () => {
    if (selectedProdIds.length <= 0) return;
    await linkProducts._postData(`${TRANSACTION_URL.GET_LIST_POS}/${posId}/linkProducts`, {
      productIds: selectedProdIds,
    });
    refreshParent();
  };

  const postSuccess = () => {
    alertService.success(`Thành công`);
  };

  const postFailed = () => {
    alertService.error(`Thất bại`);
  };

  const columns = [
    {
      name: 'Name',
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
      maxWidth: '150px',
      sortable: true,
    },
    {
      name: 'Giá',
      selector: (row) => row.price?.toLocaleString('en-US') || 0,
      sortable: true,
      maxWidth: '50px',
    },
  ];

  function onSelectedRows(selectedRows) {
    if (selectedRows?.selectedCount > 0) {
      const selectedProdIds = selectedRows.selectedRows.map((row) => row.id);
      setSelectedProdIds(selectedProdIds);
    }
  }

  return (
    <Modal isOpen={isOpen} size="lg">
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          Gán sản phẩm vào POS
        </h3>
        <button aria-label="Close" className="close" type="button" onClick={() => setModalOpen(false)}>
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <CardBody>
          <CustomDataTable
            data={unlinkProducts?.data}
            columns={columns}
            progressPending={unlinkProducts?.isLoading}
            pagination
            paginationServer
            selectableRows
            onSelectedRowsChange={(rows) => onSelectedRows(rows)}
            paginationTotalRows={unlinkProducts?.data?.pagination?.totalRecords ?? 0}
            onChangeRowsPerPage={(val) => {
              setParamRequest({ ...paramRequest, size: val, page: 0 });
            }}
            onChangePage={(val) => {
              setParamRequest({ ...paramRequest, page: val - 1 });
            }}
          />
        </CardBody>
      </ModalBody>
      <ModalFooter className="d-flex">
        <div className="ml-auto">
          <Button color="default" outline onClick={() => setModalOpen(false)}>
            Hủy
          </Button>
          <Button color="primary" onClick={onConfirm}>
            OK
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default MLinkProduct;
