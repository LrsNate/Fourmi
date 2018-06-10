import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { EditRouteArgs } from "../routes";
import Page from "./Page";

interface EditProps extends RouteComponentProps<EditRouteArgs> {}

class Edit extends React.Component<EditProps> {
  public render() {
    const { id } = this.props.match.params;

    return (
      <Page title="Éditer une oeuvre">
        <p>{id}</p>
      </Page>
    );
  }
}

export default withRouter(Edit);
