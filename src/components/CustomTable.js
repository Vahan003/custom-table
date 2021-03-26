import React from "react";
import PropTypes from "prop-types";

const CustomTable = ({
  headers,
  data,
  onScroll,
  onItemClick,
  onFilter,
  onRemoveItems,
}) => {
  return (
    <div>
      {headers.map((el) => (
        <div key = {el.dataIndex}>{el.title}</div>
      ))}
    </div>
  );
};

CustomTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.exact({
      dataIndex: PropTypes.string,
      title: PropTypes.string,
      width: PropTypes.number,
      sorter: PropTypes.bool,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onScroll: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onRemoveItems: PropTypes.func.isRequired,
};

export default CustomTable;
