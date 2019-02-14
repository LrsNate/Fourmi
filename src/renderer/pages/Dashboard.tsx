import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { deleteCorpusAction } from "../actions/corpora";
import DeleteCorpus from "../components/DeleteCorpus";
import Page from "../components/Page";
import SectionTitle from "../components/SectionTitle";
import { Corpus, Dispatch } from "../constants/types";
import { sortCorpora } from "../lib/corpora";
import { RootState } from "../reducers";
import {
  addRoutePath,
  martialQueryRoutePath,
  searchRoutePath,
  userCorpusRoutePath
} from "../routes";

const styles = {
  disabledCard: {
    cursor: "not-allowed"
  },
  setCard: {
    cursor: "pointer"
  }
};

function mapStateToProps(state: RootState) {
  return {
    corpora: sortCorpora(state.corpora)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    deleteCorpus(id: string) {
      dispatch(deleteCorpusAction(id));
    }
  };
}

interface DashboardProps extends RouteComponentProps<{}> {
  classes: Record<string, string>;
  corpora: Corpus[];
  deleteCorpus: (id: string) => void;
}

class Dashboard extends React.Component<DashboardProps> {
  public goToAdd = () => {
    this.props.history.push(addRoutePath());
  };

  public goToMartial = () => {
    this.props.history.push(martialQueryRoutePath());
  };

  public goToSearch = () => {
    this.props.history.push(searchRoutePath());
  };

  public goToCorpus = (id: string) => () => {
    this.props.history.push(userCorpusRoutePath(id));
  };

  public handleDeleteCorpus = (id: string) => () => {
    this.props.deleteCorpus(id);
  };

  public renderAutomaticSets() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item>
          <SectionTitle>Ensembles automatiquement générés</SectionTitle>
        </Grid>
        <Grid item>
          <Grid container spacing={16}>
            <Grid item sm={3}>
              <Card className={classes.setCard} onClick={this.goToMartial}>
                <CardContent>
                  <Typography variant="h5">Martial</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Rechercher dans des œuvres de Martial
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card className={classes.disabledCard}>
                <CardContent>
                  <Typography variant="h5">Imitations</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Rechercher dans les imitations d'auteurs
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card className={classes.setCard} onClick={this.goToSearch}>
                <CardContent>
                  <Typography variant="h5">Tout</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Rechercher dans toutes les œuvres
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  public renderUserSets() {
    const { corpora } = this.props;

    if (corpora.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <Grid item>
          <SectionTitle>Ensembles créés manuellement</SectionTitle>
        </Grid>
        <Grid item>
          <Card>
            <List>
              {corpora.map(c => (
                <ListItem key={c._id} button onClick={this.goToCorpus(c._id)}>
                  <ListItemText>{c.title}</ListItemText>
                  <ListItemSecondaryAction>
                    <DeleteCorpus
                      corpus={c}
                      onConfirm={this.handleDeleteCorpus(c._id)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </React.Fragment>
    );
  }

  public renderActions() {
    return (
      <Card>
        <CardActions>
          <Button color="primary" onClick={this.goToAdd}>
            Nouvelle œuvre
          </Button>
          <Button>Recherche spécifique</Button>
        </CardActions>
      </Card>
    );
  }

  public render() {
    return (
      <Page title="Fourmi">
        <Grid container direction="column" spacing={24}>
          <Grid item>{this.renderActions()}</Grid>
          {this.renderAutomaticSets()}
          {this.renderUserSets()}
        </Grid>
      </Page>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Dashboard)));
