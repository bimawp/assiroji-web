'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

const EditorComponent = ({ initialContent = '', onContentChange }) => {
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
      console.log(htmlContent);
      if (onContentChange) {
        onContentChange(htmlContent, rawContent);
      }
    },
    [onContentChange]
  );

  // useEffect(() => {
  //   if (initialContent) {
  //     try {
  //       const contentState = stateFromHTML(initialContent);
  //       setEditorState(EditorState.createWithContent(contentState));
  //     } catch {
  //       setEditorState(EditorState.createEmpty());
  //     }
  //   }
  // }, [initialContent]);

  return (
    <div className="mt-4">
      <Editor
        editorState={editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={handleEditorChange}
      />
    </div>
  );
};

export default EditorComponent;
