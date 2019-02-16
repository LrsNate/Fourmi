import { Grid } from "@material-ui/core";
import produce from "immer";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import CorpusActions from "../components/corpusActions/CorpusActions";
import EpigramView from "../components/epigramView/EpigramView";
import Page from "../components/Page";
import { Epigram } from "../constants/types";
import { QueryField } from "../lib/epigrams/query";
import { getSortKey } from "../lib/epigrams/sort";
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
  const epigrams = _.chain(state.epigrams)
    .values()
    .sortBy(e => getSortKey(state.epigrams, e))
    .filter(e => e.author === "Martial")
    .value();

  const { field, value } = ownProps.match.params;
  return {
    epigrams: getFilteredEpigrams(
      epigrams,
      QueryField[field as keyof typeof QueryField],
      value
    )
  };
}

interface MartialResultsState {
  selectingEpigrams: boolean;
  selectedEpigrams: { [id: string]: boolean };
}

class MartialResults extends React.Component<
  MartialResultsProps,
  MartialResultsState
> {
  public state: MartialResultsState = {
    selectingEpigrams: false,
    selectedEpigrams: {}
  };

  public get epigramIds() {
    return Object.entries(this.state.selectedEpigrams)
      .filter(([id, selected]) => !!selected)
      .map(([id]) => id);
  }

  public handleToggleSelectingEpigrams = (selectingEpigrams: boolean) => {
    if (selectingEpigrams) {
      this.setState({ selectingEpigrams: true });
    } else {
      this.setState({ selectingEpigrams: false, selectedEpigrams: {} });
    }
  };

  public handleToggleSelected = (id: string) => (selected: boolean) => {
    this.setState(state =>
      produce(state, draft => {
        draft.selectedEpigrams[id] = selected;
      })
    );
  };

  public render() {
    const { epigrams } = this.props;
    const { field, value } = this.props.match.params;
    const { selectingEpigrams, selectedEpigrams } = this.state;

    const fieldLabel =
      field === QueryField[QueryField.Book] ? "Livre" : "Thème";

    return (
      <Page title={`${fieldLabel} : ${value}`}>
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <CorpusActions
              epigramIds={this.epigramIds}
              onToggleSelectingEpigrams={this.handleToggleSelectingEpigrams}
            />
          </Grid>
          {epigrams.slice(0, 20).map((e: Epigram) => (
            <Grid item key={e._id}>
              <EpigramView
                epigram={e}
                startExpanded
                selectable={selectingEpigrams}
                onToggleSelected={this.handleToggleSelected(e._id)}
                selected={!!selectedEpigrams[e._id]}
              />
            </Grid>
          ))}
        </Grid>
      </Page>
    );
  }
}

export default connect(mapStateToProps)(withRouter(MartialResults));
