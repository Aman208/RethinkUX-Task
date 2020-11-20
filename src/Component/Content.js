import {useMemo ,  useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact ,  } from 'slate-react'

import '../App.css';

const Content = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
 


  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Sample Text' }],
    },
  ])

  return ( <>
    <Slate  editor={editor} value={value} onChange={newValue => setValue(newValue)} >
      <Editable className='Editor-Css'/>
    </Slate>
  
    </>
  )
}





export default Content;
