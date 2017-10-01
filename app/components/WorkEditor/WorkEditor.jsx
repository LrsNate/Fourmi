import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';
import { Form } from 'react-form';

import type { Work } from '../../types';
import AttributesEditor from './AttributesEditor';
import TextEditor from './TextEditor';

type Props = {
  work: Work
};

class WorkEditor extends Component<Props, Work> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props.work
    };
  }

  handleChange(fieldName: string) {
    return event => {
      this.setState({
        [fieldName]: event.target.value
      });
    };
  }

  render() {
    const { notes, latinText, frenchText } = this.state;
    return (
      <Form loadState={() => ({ values: this.state })}>
        <Grid container>
          <Grid item sm={7}>
            <Paper>
              <AttributesEditor />
            </Paper>
          </Grid>
          <Grid item sm={5}>
            <Paper>Vices/Tags</Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper>
              <TextEditor
                value={latinText}
                onChange={this.handleChange('latinText')}
                label="Latin"
              />
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper>
              <TextEditor
                value={frenchText}
                onChange={this.handleChange('frenchText')}
                label="Français"
              />
            </Paper>
          </Grid>
          <Grid item sm={12}>
            <Paper>
              <TextEditor
                value={notes}
                onChange={this.handleChange('notes')}
                label="Notes"
              />
            </Paper>
          </Grid>
        </Grid>
      </Form>
    );
  }
}

export default WorkEditor;
