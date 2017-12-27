import { ContentState, EditorState } from "draft-js";
import { withStyles } from "material-ui";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { Field } from "react-final-form";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const styles = theme => ({
  editor: {
    padding: theme.spacing.unit,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E3E3E3"
  },
  toolbar: {
    backgroundColor: "#F3F3F3",
    borderColor: "#E3E3E3"
  }
});

class TextEditor extends Component {
  static propTypes = {
    classes: PropTypes.object,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    classes: {}
  };

  constructor(props) {
    super(props);
    const { value } = this.props;

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(value)
      )
    };
  }

  onEditorStateChange = editorState => {
    const { onChange } = this.props;
    this.setState({ editorState });
    onChange(editorState.getCurrentContent().getPlainText());
  };

  render() {
    const { classes } = this.props;
    const { editorState } = this.state;
    const toolbar = {
      options: ["inline", "textAlign", "colorPicker", "remove"],
      inline: {
        options: ["bold", "italic", "underline", "strikethrough", "superscript"]
      }
    };

    return (
      <Editor
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

const TextEditorWrapper = ({ name }) => {
  const EditorComponent = withStyles(styles)(TextEditor);

  return (
    <Field name={name}>
      {({ input: { value, onChange } }) => (
        <EditorComponent value={value} onChange={onChange} />
      )}
    </Field>
  );
};

TextEditorWrapper.propTypes = {
  name: PropTypes.string.isRequired
};

export default TextEditorWrapper;
