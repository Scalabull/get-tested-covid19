import React, { useState } from 'react';
import { Button, Tooltip } from "reactstrap";

const ShareBtn = props => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const copyUrl = zip => {
      const dummyInput = document.createElement('input');
      const url = window.location.href;
      document.body.appendChild(dummyInput);
      dummyInput.value = url;
      dummyInput.select();
      document.execCommand('copy');
      document.body.removeChild(dummyInput);
      setTooltipOpen(true);
      setTimeout(() => {
        setTooltipOpen(false);
      }, 2000)
  }

  return (
    <>
      <Button id="tooltip-share" className="d-flex align-items-center" color="primary" outline size="sm" onClick={copyUrl}><i className="fas fa-share icon-left" /> Share</Button>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target="tooltip-share"
        fade={false}
      >
        Results link copied
      </Tooltip>
    </>
  )
}

export default ShareBtn;