import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';

const Panels = (props) => {
  const { isCollapse, title, children } = props;
  const [openedCollapses, setOpenedCollapses] = useState(isCollapse || true);
  const collapsesToggle = (collapse) => {
    if (openedCollapses) {
      setOpenedCollapses(false);
    } else {
      setOpenedCollapses(true);
    }
  };
  const cursorPointer = { cursor: 'pointer' };

  const showIcon = () => {
    if (openedCollapses) {
      return <i className="ni ni-bold-down text-right col-sm-1" style={cursorPointer} />;
    } else {
      return <i className="ni ni-bold-right text-right col-sm-1" style={cursorPointer} />;
    }
  };

  return (
    <>
      <div className="accordion">
        <Card className="card-plain panel-accordion-container">
          <CardHeader
            role="tab"
            className="row panel-card-header-custom"
            style={cursorPointer}
            onClick={() => collapsesToggle(true)}
            aria-expanded={openedCollapses}
          >
            <h5 className="mb-0 col-sm-11">{title || ''}</h5>
            {showIcon()}
          </CardHeader>
          <Collapse role="tabpanel" isOpen={openedCollapses}>
            <CardBody className="">{children}</CardBody>
          </Collapse>
        </Card>
      </div>
    </>
  );
};

export default Panels;
