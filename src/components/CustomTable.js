import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { ReactComponent as ArrowSvg } from "./icon/arrow-selector.svg";
import { ReactComponent as FilterSvg } from "./icon/filter.svg";
import { ReactComponent as TrashSvg } from "./icon/trash.svg";
import loadingGif from "./icon/loading.gif";
import "../styles/customTable.style.css";
const CustomTable = ({
  headers,
  data,
  onScroll,
  onItemClick,
  onFilter,
  onRemoveItems,
}) => {
  const scroll = useRef(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(50);
  const [table, setTable] = useState([]);
  const [mode, setMode] = useState(false);
  const [isSorted, setIsSorted] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const onSort = (index) => {
    setIsSorted(index);
    let sortTable = [
      ...table.sort((a, b) =>
        a.row[index].elem > b.row[index].elem
          ? mode
            ? 1
            : -1
          : b.row[index].elem > a.row[index].elem
          ? mode
            ? -1
            : 1
          : 0
      ),
    ];
    setTable(sortTable);
    setMode((prev) => !prev);
  };
  useEffect(() => {
    data.forEach((element) => {
      setTable((prev) => [
        ...prev,
        {
          id: v4(),
          row: headers.map((elem) => ({
            elem:
              element[
                Object.keys(element).find((el) => el === elem.dataIndex)
              ] || null,
          })),
        },
      ]);
    });
  }, [headers, data]);

  const showItems = () => {
   let itemsArr = [];
    if (!table.length) {
      return;
    }
    else if(items >= table.length) {
      return table;
    }
      for (let i = 0; i < items; i++) {
      itemsArr.push(table[i]);
    } 
    return itemsArr;
  };

  const loadMore = () => {
      setLoading(true);
    setTimeout(() => {
      setItems((prev) => prev + 20);
      setLoading(false);
    }, 1500);
  };
  useEffect(() => {
    scroll.current.addEventListener("scroll", () => {
      if (
        scroll.current.scrollTop + scroll.current.clientHeight >=
        scroll.current.scrollHeight && !loading
      ) {
        loadMore();
        onScroll();
      }
    });
  }, []);
  const handleCheckBox = (e, id) => {
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((e) => e !== id));
    }
  };
  const handleCheckBoxAll = (e) => {
    if (e.target.checked) {
      setSelectedItems([...table.map((el) => el.id)]);
    } else {
      setSelectedItems([]);
    }
  };
  const onDelete = () => {
    selectedItems.forEach((id) => {
      setTable((prev) => prev.filter((e) => e.id !== id));
    });
    selectedItems.length
      ? onRemoveItems("Deleted!")
      : onRemoveItems("No items to delete!");
  };
  return (
    <div className="scroll_div" ref={scroll}>
      <table className="table">
        <thead>
          <tr className="row">
            <th className="checkbox">
              <input
                type="checkbox"
                checked={selectedItems.length === table.length ? true : false}
                onChange={(e) => handleCheckBoxAll(e)}
              />
            </th>
            {headers.map((el, index) => (
              <th key={el.dataIndex} className="header_elem">
                {el.title}
                {el.sorter && (
                  <ArrowSvg
                    className="arrow_svg"
                    style={
                      mode
                        ? isSorted === index
                          ? { transform: "rotate(0deg)" }
                          : { transform: "rotate(-90deg)" }
                        : isSorted === index
                        ? { transform: "rotate(180deg)" }
                        : { transform: "rotate(-90deg)" }
                    }
                    onClick={() => {
                      onSort(index);
                    }}
                  />
                )}
              </th>
            ))}
            <th>
              <FilterSvg className="icon_svg" onClick={onFilter} />
              <TrashSvg className="icon_svg" onClick={onDelete} />
            </th>
          </tr>
        </thead>
        <tbody>
          {showItems()?.map((elem) => (
            <tr key={elem.id} className="row">
              <td className="checkbox">
                <input
                  type="checkbox"
                  checked={
                    selectedItems.find((e) => e === elem.id) ? true : false
                  }
                  onChange={(e) => handleCheckBox(e, elem.id)}
                />
              </td>
              {elem.row.map((el, ind) => (
                <td key={ind} className="body_elem" onClick={onItemClick}>
                  {el.elem ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="loading">
        {loading && <img src={loadingGif} className="loading_gif"></img>}
      </div>
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
