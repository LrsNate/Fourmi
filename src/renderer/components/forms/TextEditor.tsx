import { Theme, withStyles } from "@material-ui/core";
import { convertToRaw, EditorState } from "draft-js";
import * as React from "react";
import { Field } from "react-final-form";
import Draft, { draftToHtml, htmlToDraft } from "../reactWysiwygTypescript/Draft";

const styles = (theme: Theme) => ({
  editor: {
    borderColor: "#E3E3E3",
    borderStyle: "solid",
    borderWidth: 1,
    padding: theme.spacing.unit
  },
  toolbar: {
    backgroundColor: "#F3F3F3",
    borderColor: "#E3E3E3"
  }
});

interface TextEditorClasses {
  editor: string;
  toolbar: string;
}

interface TextEditorProps {
  value: string;
  onChange: (x: any) => void;
  classes: TextEditorClasses;
}

interface TextEditorState {
  editorState: EditorState;
}

class TextEditor extends React.Component<TextEditorProps, TextEditorState> {
  constructor(props: TextEditorProps) {
    super(props);
    const { value } = this.props;
    const editorState = htmlToDraft(value);

    this.state = {
      editorState
    };
  }

  public onEditorStateChange = (editorState: EditorState) => {
    const { onChange } = this.props;
    this.setState({ editorState });
    onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  public render() {
    const { classes } = this.props;
    const { editorState } = this.state;
    const toolbar = {
      inline: {
        options: ["bold", "italic", "underline", "strikethrough", "superscript"]
      },
      options: ["inline", "textAlign", "colorPicker", "remove"]
    };

    return (
      <Draft
        toolbar={toolbar}
        editorState={editorState}
        editorClassName={classes.editor}
        toolbarClassName={classes.toolbar}
        onEditorStateChange={this.onEditorStateChange}
        localization={{ locale: "fr" }}
      />
    );
  }
}

interface TextEditorWrapperProps {
  name: string;
  classes: TextEditorClasses;
}

const TextEditorWrapper: React.SFC<TextEditorWrapperProps> = ({
  name,
  classes
}) => {
  return (
    <Field name={name}>
      {({ input: { value, onChange } }) => (
        <TextEditor classes={classes} value={value} onChange={onChange} />
      )}
    </Field>
  );
};

export default withStyles(styles)(TextEditorWrapper);
