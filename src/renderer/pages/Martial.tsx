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
import Page from "../components/Page";
import SectionTitle from "../components/SectionTitle";
import { Epigram } from "../constants/types";
import { getSortKey } from "../lib/epigrams/sort";
import { RootState } from "../reducers";

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
    .flatMap(e => e.themes || [])
    .sort()
    .uniq()
    .value();

  return { books, themes };
}

interface MartialProps {
  books: string[];
  themes: string[];
}

class Martial extends React.Component<MartialProps> {
  public render() {
    const { books, themes } = this.props;
    return (
      <Page title="Oeuvres de Martial">
        <Grid container direction="column" spacing={24}>
          <Grid item>
            <SectionTitle>Rechercher par:</SectionTitle>
          </Grid>
          <Grid item>
            <Grid container spacing={16}>
              <Grid item sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="headline">Livres</Typography>
                    <List>
                      {books.map(book => (
                        <ListItem key={book} disableGutters button>
                          <ListItemIcon>
                            <ChevronRight />
                          </ListItemIcon>
                          <ListItemText>
                            {!book.startsWith("De") && "Livre "}
                            {book}
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="headline">Thèmes</Typography>
                    <List>
                      {themes.map(theme => (
                        <ListItem key={theme} disableGutters button>
                          <ListItemIcon>
                            <ChevronRight />
                          </ListItemIcon>
                          <ListItemText>{theme}</ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Page>
    );
  }
}

export default connect(mapStateToProps)(Martial);
