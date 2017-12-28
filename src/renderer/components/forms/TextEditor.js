import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
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
    const { contentBlocks, entityMap } = htmlToDraft(value);

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(contentBlocks, entityMap)
      )
    };
  }

  onEditorStateChange = editorState => {
    const { onChange } = this.props;
    this.setState({ editorState });
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
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
        onBlur={this.handleBlur}
        onEditorStateChange={this.onEditorStateChange}
        localization={{ locale: "fr" }}
      />
    );
  }
}

const TextEditorWrapper = ({ name, classes }) => {
  return (
    <Field name={name}>
      {({ input: { value, onChange } }) => (
        <TextEditor classes={classes} value={value} onChange={onChange} />
      )}
    </Field>
  );
};

TextEditorWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.object
};

TextEditorWrapper.defaultProps = {
  classes: {}
};

export default withStyles(styles)(TextEditorWrapper);
