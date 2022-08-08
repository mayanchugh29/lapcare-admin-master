import React from "react"
import { Editor } from "@tinymce/tinymce-react"

const TextEditor = (props) => {
  const handleEditorChange = (content) => {
    props.setFieldValue(`${props.fieldName}`, content)
  }

  return (
    <div>
      <Editor
        textareaName="longDescription"
        initialValue={props.value}
        init={{
          height: 300,
          width: "100%",
          menubar: false,
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help",
        }}
        onEditorChange={handleEditorChange}
        apiKey="02gu6jueiw1anx09tjna4gyhp6hqd0mjd9rtm3kuh8a9yxjv"
      />
    </div>
  )
}

export default TextEditor
