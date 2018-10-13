import { Grid } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import EpigramView from "../components/epigramView/EpigramView";
import Page from "../components/Page";
import { Epigram } from "../constants/types";
import { QueryField } from "../lib/epigrams/query";
import { RootState } from "../reducers";
import { MartialResultsRouteArgs } from "../routes";

interface MartialResultsProps
  extends RouteComponentProps<MartialResultsRouteArgs> {
  epigrams: Epigram[];
}

function getFilteredEpigrams(
  epigrams: Epigram[],
  field: QueryField,
  value: string
) {
  if (field === QueryField.Book) {
    return epigrams.filter(e => e.reference.split(", ")[0] === value);
  }
  return epigrams.filter(e => e.themes && e.themes.includes(value));
}

function mapStateToProps(state: RootState, ownProps: MartialResultsProps) {
  const epigrams = Object.values(state.epigrams).filter(
    e => e.author === "Martial"
  );

  const { field, value } = ownProps.match.params;
  return {
    epigrams: getFilteredEpigrams(
      epigrams,
      QueryField[field as keyof typeof QueryField],
      value
    )
  };
}

class MartialResults extends React.Component<MartialResultsProps> {
  public render() {
    const { epigrams } = this.props;

    return (
      <Page title="?">
        <Grid container direction="column" spacing={8}>
          {epigrams.slice(0, 20).map((e: Epigram) => (
            <Grid item key={e._id}>
              <EpigramView
                epigram={e}
                showEditLink
                filterByImitations={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </Page>
    );
  }
}

export default connect(mapStateToProps)(withRouter(MartialResults));
