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
import { martialRoutePath, searchRoutePath } from "../routes";

interface DashboardProps extends RouteComponentProps<{}> {}

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
    return (
      <Page title="Dashboard">
        <Grid container={true} direction="column" spacing={24}>
          <Grid item={true}>{this.renderActions()}</Grid>
          <Grid item={true}>
            <SectionTitle>Ensembles automatiquement générés</SectionTitle>
          </Grid>
          <Grid item={true}>{this.renderAutomaticSets()}</Grid>
        </Grid>
      </Page>
    );
  }
}

export default withRouter(Dashboard);
