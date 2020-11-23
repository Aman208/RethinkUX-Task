import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Editor, createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";

import {editorDiv , initialValue , HOTKEYS} from '../Constant/intialValue';

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const MyEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initialValue);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  useEffect(() => {
    setValue(initialValue);
  });
  return (
    <div style={editorDiv}>
      <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
        <Editable
          spellCheck
          autoFocus
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            console.log(event.key);
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default MyEditor;
