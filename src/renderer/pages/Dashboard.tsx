import {
  Button,
  Card, CardActions,
  CardContent,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Page from "../components/Page";
import { martialRoutePath, searchRoutePath } from "../routes";

const styles = {
  sectionTitle: { paddingLeft: 22 }
};

interface DashboardProps extends RouteComponentProps<{}> {
  classes: { sectionTitle: string };
}

class Dashboard extends React.Component<DashboardProps> {
  public goToMartial = () => {
    this.props.history.push(martialRoutePath());
  };

  public goToSearch = () => {
    this.props.history.push(searchRoutePath());
  };

  public renderAutomaticSets() {
    return (
      <Grid container={true} spacing={16}>
        <Grid item={true} sm={3} onClick={this.goToMartial}>
          <Card>
            <CardContent>
              <Typography variant="headline">Martial</Typography>
              <Typography variant="caption">
                Rechercher dans des œuvres de Martial
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} sm={3} onClick={this.goToSearch}>
          <Card>
            <CardContent>
              <Typography variant="headline">Imitations</Typography>
              <Typography variant="caption">
                Rechercher dans les imitations d'auteurs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} sm={3} onClick={this.goToSearch}>
          <Card>
            <CardContent>
              <Typography variant="headline">Tout</Typography>
              <Typography variant="caption">
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
          <Button color="primary">Nouvelle œuvre</Button>
          <Button>Recherche spécifique</Button>
        </CardActions>
      </Card>
    );
  }

  public render() {
    const { classes } = this.props;
    return (
      <Page title="Dashboard">
        <Grid container={true} direction="column" spacing={24}>
          <Grid item={true}>{this.renderActions()}</Grid>
          <Grid item={true}>
            <Typography variant="display1" className={classes.sectionTitle}>
              Ensembles automatiquement générés
            </Typography>
          </Grid>
          <Grid item={true}>{this.renderAutomaticSets()}</Grid>
        </Grid>
      </Page>
    );
  }
}

export default withStyles(styles)(withRouter(Dashboard));
