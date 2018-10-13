import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Page from "../components/Page";
import SectionTitle from "../components/SectionTitle";
import { martialQueryRoutePath, searchRoutePath } from "../routes";

interface DashboardProps extends RouteComponentProps<{}> {}

class Dashboard extends React.Component<DashboardProps> {
  public goToMartial = () => {
    this.props.history.push(martialQueryRoutePath());
  };

  public goToSearch = () => {
    this.props.history.push(searchRoutePath());
  };

  public renderAutomaticSets() {
    return (
      <Grid container spacing={16}>
        <Grid item sm={3} onClick={this.goToMartial}>
          <Card>
            <CardContent>
              <Typography variant="headline">Martial</Typography>
              <Typography variant="caption">
                Rechercher dans des œuvres de Martial
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3} onClick={this.goToSearch}>
          <Card>
            <CardContent>
              <Typography variant="headline">Imitations</Typography>
              <Typography variant="caption">
                Rechercher dans les imitations d'auteurs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3} onClick={this.goToSearch}>
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
    return (
      <Page title="Dashboard">
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

export default withRouter(Dashboard);
