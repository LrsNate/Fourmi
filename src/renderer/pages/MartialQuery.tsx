import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import Page from "../components/Page";
import SectionTitle from "../components/SectionTitle";
import { Epigram } from "../constants/types";
import { QueryField } from "../lib/epigrams/query";
import { getSortKey } from "../lib/epigrams/sort";
import { RootState } from "../reducers";
import { martialResultsRoutePath } from "../routes";

function mapStateToProps(state: RootState) {
  const epigrams = Object.values(state.epigrams).filter(
    e => e.author === "Martial"
  );

  const books = _.chain(epigrams)
    .sortBy(e => getSortKey(state.epigrams, e))
    .map((e: Epigram) => e.reference && e.reference.split(", ")[0])
    .uniq()
    .value();

  const themes = _.chain(epigrams)
    .flatMap(e => e.themes)
    .filter(t => t)
    .sort()
    .uniq()
    .value();

  return { books, themes };
}

interface FieldListProps {
  title: string;
  items: string[];
  display: (key: string) => string;
  filterBy: (value: string) => void;
}

const FieldList: React.SFC<FieldListProps> = ({
  title,
  items,
  display,
  filterBy
}) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{title}</Typography>
      <List>
        {items.map(item => (
          <ListItem
            key={item}
            onClick={() => filterBy(item)}
            disableGutters
            button
          >
            <ListItemIcon>
              <ChevronRight />
            </ListItemIcon>
            <ListItemText>{display(item)}</ListItemText>
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

interface MartialQueryProps extends RouteComponentProps<{}> {
  books: string[];
  themes: string[];
}

class MartialQuery extends React.Component<MartialQueryProps> {
  public displayBookName(book: string) {
    return book.startsWith("De") ? book : `Livre ${book}`;
  }

  public filterBy = (field: QueryField) => (value: string) => {
    this.props.history.push(martialResultsRoutePath(QueryField[field], value));
  };

  public displayThemeName = (theme: string) => theme;

  public renderFields() {
    const { books, themes } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item sm={6}>
          <FieldList
            title="Livres"
            items={books}
            display={this.displayBookName}
            filterBy={this.filterBy(QueryField.Book)}
          />
        </Grid>
        <Grid item sm={6}>
          <FieldList
            title="Thèmes"
            items={themes}
            display={this.displayThemeName}
            filterBy={this.filterBy(QueryField.Theme)}
          />
        </Grid>
      </Grid>
    );
  }

  public render() {
    return (
      <Page title="Oeuvres de Martial">
        <Grid container direction="column" spacing={24}>
          <Grid item>
            <SectionTitle>Rechercher par:</SectionTitle>
          </Grid>
          <Grid item>{this.renderFields()}</Grid>
        </Grid>
      </Page>
    );
  }
}

// @ts-ignore
export default connect(mapStateToProps)(withRouter(MartialQuery));
