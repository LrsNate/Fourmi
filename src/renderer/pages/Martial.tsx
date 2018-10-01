import { Card, CardHeader, Grid, Typography } from "@material-ui/core";
import * as React from "react";
import Page from "../components/Page";

export default class Martial extends React.Component {
  public render() {
    return (
      <Page title="Oeuvres de Martial">
        <Grid container direction="column" spacing={24}>
          <Grid item>
            <Typography variant="display1">Rechercher par:</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={16}>
              <Grid item sm={6}>
                <Card>
                  <CardHeader title="Livre" />
                </Card>
              </Grid>
              <Grid item sm={6}>
                <Card>
                  <CardHeader title="Thème" />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Page>
    );
  }
}
