const editorDiv = {
  backgroundColor: "#ccc",
borderRadius: "15px",
minHeight: "200px",
padding: "8px",
margin: "2%",
};

const initialValue = [
{
  type: "paragraph",
  children: [{ text: "An opening paragraph..." }],
},
];

const HOTKEYS = {
"mod+b": "bold",
"mod+i": "italic",
"mod+u": "underline",
};

const intialValueTable = [
  {
    type: "table",
    children: [
      {
        type: "table-row",
        key: "row_1",
        children: [
          {
            type: "table-cell",
            key: "cell_1",

            children: [{ text: "X", bold: true, italic: true }],
          },
          {
            type: "table-cell",
            key: "cell_2",
            children: [{ text: "", bold: true }],
          },
          {
            type: "table-cell",
            key: "cell_3",
            children: [{ text: "", bold: true }],
          },
          {
            type: "table-cell",
            key: "cell_4",
            children: [{ text: "", bold: true }],
          },
        ],
      },
      {
        type: "table-row",
        key: "row_2",
        children: [
          {
            type: "table-cell",
            key: "cell_5",
            children: [{ text: "", bold: true }],
          },
          {
            type: "table-cell",
            key: "cell_6",
            children: [{ text: "" }],
          },
          {
            type: "table-cell",
            key: "cell_7",
            children: [{ text: "" }],
          },
          {
            type: "table-cell",
            key: "cell_8",
            children: [{ text: "" }],
          },
        ],
      },
      {
        type: "table-row",
        key: "row_3",
        children: [
          {
            type: "table-cell",
            key: "cell_9",
            children: [{ text: "", bold: true }],
          },
          {
            type: "table-cell",
            key: "cell_10",
            children: [{ text: "" }],
          },
          {
            type: "table-cell",
            key: "cell_11",
            children: [{ text: "" }],
          },
          {
            type: "table-cell",
            key: "cell_12",
            children: [{ text: "" }],
          },
        ],
      },
    ],
  },
];


export { editorDiv , initialValue , HOTKEYS , intialValueTable};