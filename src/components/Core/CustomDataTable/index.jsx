import DataTable, { createTheme } from 'react-data-table-component';
import { Spinner } from 'reactstrap';

createTheme('solarized', {
  text: {
    primary: '##737f8d',
    secondary: '#5e72e4',
  },
  background: {
    default: '##cb4b16',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

const customStyles = {
  headRow: {
    style: {
      backgroundColor: '#f6f9fc',
      borderColor: '#e9ecef',
      fontSize: '0.65rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      borderColor: '#e9ecef',
    },
  },
};
const CustomDataTable = (props) => {
  const { columns, data, selectableRows, onSelectedRowsChange, tableTitle, progressPending } = props;

  const renderLoading = () => {
    return (
      <div>
        <Spinner color="primary" type="grow">
          Loading...
        </Spinner>
        <Spinner color="secondary" type="grow">
          Loading...
        </Spinner>
        <Spinner color="success" type="grow">
          Loading...
        </Spinner>
        <Spinner color="danger" type="grow">
          Loading...
        </Spinner>
        <Spinner color="warning" type="grow">
          Loading...
        </Spinner>
        <Spinner color="info" type="grow">
          Loading...
        </Spinner>
        <Spinner color="light" type="grow">
          Loading...
        </Spinner>
        <Spinner color="dark" type="grow">
          Loading...
        </Spinner>
      </div>
    );
  };
  return (
    <DataTable
      progressComponent
      customStyles={renderLoading}
      theme="solarized"
      title={tableTitle}
      data={data}
      progressPending={progressPending}
      columns={columns}
      selectableRows={selectableRows}
      onSelectedRowsChange={onSelectedRowsChange}
      paginationRowsPerPageOptions={[20, 40, 60, 100]}
      paginationPerPage={20}
      {...props}
    />
  );
};

export default CustomDataTable;
