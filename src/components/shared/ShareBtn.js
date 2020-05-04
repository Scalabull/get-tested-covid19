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
      }, 3000)
  }

  return (
    <>
      <Button id="tooltip-share" outline size="sm" onClick={copyUrl}><i className="fa fa-share" /> Share</Button>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target="tooltip-share"
        fade={false}
      >
        Results URL copied to clipboard
      </Tooltip>
    </>
  )
}

export default ShareBtn;