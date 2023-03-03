import { Editor } from '@tinymce/tinymce-react';
import * as React from 'react';

export interface IEditorTinyProps {
}

export function EditorTiny (props: IEditorTinyProps) {
  return (
    <div>
    <label>Description</label>
    <Editor
        // initialValue={data.description}
        // onEditorChange={(newtext) => {
        //   setProject({
        //     ...project,
        //     description: newtext
        //   })

        // }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      </div>
  );
}
