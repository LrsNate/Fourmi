import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Page from "../components/Page";
import SectionTitle from "../components/SectionTitle";
import {
  addRoutePath,
  martialQueryRoutePath,
  searchRoutePath
} from "../routes";

const styles = {
  disabledCard: {
    cursor: "not-allowed"
  },
  setCard: {
    cursor: "pointer"
  }
};

interface DashboardProps extends RouteComponentProps<{}> {
  classes: Record<string, string>;
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

  public renderAutomaticSets() {
    const { classes } = this.props;

    return (
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
          <Grid item>
            <SectionTitle>Ensembles automatiquement générés</SectionTitle>
          </Grid>
          <Grid item>{this.renderAutomaticSets()}</Grid>
        </Grid>
      </Page>
    );
  }
}

export default withRouter(withStyles(styles)(Dashboard));
