import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { Editor, Range, Point, createEditor, Transforms } from "slate";
import { withHistory } from "slate-history";
import { intialValueTable } from "../Constant/intialValue";

import ContextMenu from './Component/controls';
import "./commands.css";

const TableEditor = () => {
  const [value, setValue] = useState([]);
  const [control, setControl] = useState(false);

  const [rowIndex, setRowIndex] = useState(0);

  const [colIndex, setColIndex] = useState(0);

  const [row_count, setRow_count] = useState(3);
  const [col_count, setCol_count] = useState(4);

  useEffect(() => {
    console.log(value);
  }, [row_count, col_count, value]);

  function handleCellClick(key) {
    let i, j;
    let flag = false;
    console.log("working", value);

    for (i = 0; i < row_count; i++) {
      for (j = 0; j < col_count; j++) {
        if (value[0].children[i].children[j].key === key) {
          flag = true;
          break;
        }
      }
      if (flag) break;
    }

    setRowIndex(i);
    setColIndex(j);
  }

  function AddRowUp() {
    const cellNodes = [...new Array(col_count)].map(() => {
      return {
        type: "table-cell",
        key: "row_" + Math.floor(Math.random() * 100),
        children: [{ text: "New", bold: true }],
      };
    });

    var x = {
      type: "table-row",
      key: "row_" + Math.floor(Math.random() * 100),
      children: cellNodes,
    };

    let intialRow_Array = value[0].children;
    intialRow_Array.splice(rowIndex, 0, x);
    let y = [{ type: "table", children: intialRow_Array }];

    setValue(y);

    

    setRow_count(row_count + 1);
    setCol_count(col_count);
  }

  function AddRowDown() {
    const cellNodes = [...new Array(col_count)].map(() => {
      return {
        type: "table-cell",
        key:
          "row_" +
          Math.floor(Math.random() * 100) +
          Math.floor(Math.random() * 100),
        children: [{ text: "New", bold: true }],
      };
    });

    var x = {
      type: "table-row",
      key:
        "row_" +
        Math.floor(Math.random() * 100) +
        Math.floor(Math.random() * 100),
      children: cellNodes,
    };

    let intialRow_Array = value[0].children;
    intialRow_Array.splice(rowIndex + 1, 0, x);
    let y = [{ type: "table", children: intialRow_Array }];

    setValue(y);

    setRow_count(row_count + 1);
    setCol_count(col_count);
  }

  const renderElement = useCallback(
    (props) => <Element {...props} temp={handleCellClick} />,
    [value]
  );
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderNew = useCallback((props) => <RenderNew {...props} />, []);
  const editor = useMemo(
    () => withTables(withHistory(withReact(createEditor()))),
    []
  );

  return (
    <>
      <button
        onClick={() => {
          setValue(intialValueTable);
          setControl(true);
        }}
      >
        Add Table
      </button>

      <p>
        Row and Col Count {row_count} , {col_count}
      </p>
      <p>
        Row and Col Index {rowIndex} , {colIndex}
      </p>

      <button
        onClick={() => {
          setControl(!control);
        }}
      >
        {" "}
        Controls
      </button>

      {control ? (
        <ContextMenu AddRowUp={AddRowUp} AddRowDown={AddRowDown} />
      ) : null}
      <div className="Table-Editor">
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            renderNew={renderNew}
            onClick={() => {
              // console.log(editor.addMark);
            }}
          />
        </Slate>{" "}
      </div>
      {/* </ContextMenuComp> */}
    </>
  );
};

const withTables = (editor) => {
  const {
    addMark,
    removeMark,
    deleteBackward,
    deleteForward,
    insertBreak,
  } = editor;

  editor.addMark = (key, value) => {
    if (editor.selection) {
      const lastSelection = editor.selection;

      const selectedCells = Editor.nodes(editor, {
        match: (n) => n.selectedCell,
        at: [],
      });

      let isTable = false;

      for (let cell of selectedCells) {
        if (!isTable) {
          isTable = true;
        }

        const [content] = Editor.nodes(editor, {
          match: (n) => n.type === "table-content",
          at: cell[1],
        });

        if (Editor.string(editor, content[1]) !== "") {
          Transforms.setSelection(editor, Editor.range(editor, cell[1]));
          addMark(key, value);
        }
      }

      if (isTable) {
        Transforms.select(editor, lastSelection);
        return;
      }
    }

    addMark(key, value);
  };

  editor.removeMark = (key) => {
    if (editor.selection) {
      const lastSelection = editor.selection;
      const selectedCells = Editor.nodes(editor, {
        match: (n) => {
          return n.selectedCell;
        },
        at: [],
      });

      let isTable = false;
      for (let cell of selectedCells) {
        if (!isTable) {
          isTable = true;
        }

        const [content] = Editor.nodes(editor, {
          match: (n) => n.type === "table-content",
          at: cell[1],
        });

        if (Editor.string(editor, content[1]) !== "") {
          Transforms.setSelection(editor, Editor.range(editor, cell[1]));
          removeMark(key);
        }
      }

      if (isTable) {
        Transforms.select(editor, lastSelection);
        return;
      }
    }
    removeMark(key);
  };

  editor.deleteBackward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) => n.type === "table-cell",
      });

      if (cell) {
        const [, cellPath] = cell;
        const start = Editor.start(editor, cellPath);

        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  editor.deleteForward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) => n.type === "table-cell",
      });

      if (cell) {
        const [, cellPath] = cell;
        const end = Editor.end(editor, cellPath);

        if (Point.equals(selection.anchor, end)) {
          return;
        }
      }
    }

    deleteForward(unit);
  };

  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection) {
      const [table] = Editor.nodes(editor, {
        match: (n) => n.type === "table",
      });

      if (table) {
        return;
      }
    }

    insertBreak();
  };

  return editor;
};

const Element = ({ attributes, children, element, temp }) => {
  switch (element.type) {
    case "table":
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case "table-row":
      return <tr {...attributes}>{children}</tr>;
    case "table-cell":
      return (
        <td
          onClick={() => temp(element.key)}
          style={{ border: "1px solid black", width: "50px", height: "40px" }}
          {...attributes}
        >
          {children}
        </td>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  return <span {...attributes}>{children}</span>;
};



const RenderNew = ({ attributes, children, element }) => {
  return <p {...attributes}>{children}</p>;
};

export default TableEditor;
