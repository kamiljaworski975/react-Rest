import React from "react";
import { Button, Icon } from "semantic-ui-react";

export const Buttons = ({ page, maxPage, handleAddPages, handleMinPages }) => {
  return (
    <div className="results__pages">
      <Button
        disabled={page === 1}
        onClick={handleMinPages}
        style={{ float: "left" }}
        size="tiny"
        icon
        labelPosition="left"
      >
        Previous
        <Icon name="left arrow" />
      </Button>
      <Button
        disabled={page === maxPage}
        onClick={handleAddPages}
        style={{ float: "right" }}
        size="tiny"
        icon
        labelPosition="right"
      >
        Next
        <Icon name="right arrow" />
      </Button>
    </div>
  );
};
