import React, { useEffect , useRef} from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
const Editorcom = () => {
  const editorRef = useRef(null);
  const textAreaRef = useRef(null);
  useEffect(() => {
    async function init() {
      /*Codemirror.fromTextArea(document.getElementById('realTimeEditor'),{
          mode: {name: 'javascript', json: true},
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers:true,*/
          if (!editorRef.current) {
            editorRef.current = Codemirror.fromTextArea(textAreaRef.current, {
              mode: { name: 'javascript', json: true },
              theme: 'dracula',
              autoCloseTags: true,
              autoCloseBrackets: true,
              lineNumbers: true,
      });
    }
  }
    init();
  },[]);
  return <textarea ref={textAreaRef} id="realTimeEditor"></textarea>;
  //return <textarea id="realTimeEditor"></textarea>
}

export default Editorcom

