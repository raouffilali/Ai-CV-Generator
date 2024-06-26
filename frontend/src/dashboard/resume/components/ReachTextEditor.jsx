import React from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  createButton,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
  
} from "react-simple-wysiwyg";

function ReachTextEditor({onRichTextEditorChange}) {
  const [value, setValue] = React.useState("");
  const BtnAlignCenter = createButton("Align center", "≡", "justifyCenter");
  return (
    <div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e)
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnAlignCenter />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default ReachTextEditor;
