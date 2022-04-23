import React from 'react';

const expandComponent = (props) => {
  const { data, changeFuncIsAccessed, getAllowedMenus } = props;

  const initCheckedMenu = (value) => {
    if (getAllowedMenus?.data?.length && !getAllowedMenus.isLoading) {
      return !!getAllowedMenus?.data?.find((e) => e?.id === value?.id);
    }
  };
  return (
    <>
      {data?.children
        ? Array.from(data?.children)?.map((child) => (
            <div key={child?.id} id="row-9" role="row" className="sc-jqUVSM bjTqEm rdt_TableRow">
              <div className="sc-hKMtZM sc-ftvSup imjOZz ejwJAK" />
              <div
                id="cell-1-9"
                data-column-id="1"
                role="gridcell"
                className="sc-hKMtZM sc-eCYdqJ sc-jSMfEi jfrgbA bnAwAJ bMgaAx rdt_TableCell"
                data-tag="allowRowEvents"
              >
                <div data-tag="allowRowEvents" style={{ paddingLeft: 20 }}>
                  {child?.description}
                </div>
              </div>
              <div
                id="cell-2-9"
                data-column-id="2"
                role="gridcell"
                className="sc-hKMtZM sc-eCYdqJ sc-jSMfEi jfrgbA bnAwAJ bMgaAx rdt_TableCell"
                data-tag="allowRowEvents"
              >
                <div data-tag="allowRowEvents">{child?.code}</div>
              </div>
              <div
                id="cell-3-9"
                data-column-id="3"
                role="gridcell"
                className="sc-hKMtZM sc-eCYdqJ sc-jSMfEi jfrgbA bnAwAJ bMgaAx rdt_TableCell"
                data-tag="allowRowEvents"
              >
                <label className="custom-toggle custom-toggle">
                  <input
                    type="checkbox"
                    defaultChecked={initCheckedMenu(child)}
                    onClick={(event) => changeFuncIsAccessed(event, child)}
                  />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
              </div>
            </div>
          ))
        : ''}
    </>
  );
};

export default expandComponent;
