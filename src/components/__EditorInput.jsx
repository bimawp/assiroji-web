'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

const EditorComponent = ({ initialContent = '', onContentChange, toolbarConfig = '' }) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      try {
        const contentState = stateFromHTML(initialContent);

        return EditorState.createWithContent(contentState);
      } catch {
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });

  const handleEditorChange = useCallback(
    (state) => {
      setEditorState(state);
      const content = state.getCurrentContent();
      const htmlContent = stateToHTML(content);
      const rawContent = JSON.stringify(convertToRaw(content));
    
      if (onContentChange) {
        onContentChange(htmlContent, rawContent);
      }
    },
    [onContentChange]
  );

  return (
    <div className="mt-4">
      <Editor
        editorState={editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={handleEditorChange}
        toolbar={toolbarConfig}
      />
    </div>
  );
};

export default EditorComponent;
