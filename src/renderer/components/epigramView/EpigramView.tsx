import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Theme,
  Typography,
  withStyles
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import * as React from "react";
import { Epigram } from "../../constants/types";
import { getEpigramIncipit, getEpigramTitle } from "../../lib/epigrams/display";
import ActionsMenu from "./ActionsMenu";

const styles = (theme: Theme) => ({
  card: {
    marginBottom: theme.spacing.unit
  }
});

interface EpigramViewProps {
  classes: { card: string };
  actions?: (epigram: Epigram) => React.ReactNode;
  epigram: Epigram;
  showEditLink: boolean;
  filterByImitations: (id: string) => void;
}

interface EpigramViewState {
  collapsed: boolean;
}

class EpigramView extends React.Component<EpigramViewProps, EpigramViewState> {
  public state = {
    collapsed: true
  };

  public toggleCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  public renderEpigramContent() {
    const { epigram } = this.props;
    const { collapsed } = this.state;

    const latinText = epigram.latinText || "";
    const frenchText = epigram.frenchText || "";

    return (
      <Collapse in={!collapsed}>
        <CardContent>
          <Grid container={true}>
            <Grid item={true} sm={6}>
              <Typography>
                <span
                  dangerouslySetInnerHTML={{
                    __html: latinText.replace(/ {2}/g, "\u00a0\u00a0")
                  }}
                />
              </Typography>
            </Grid>
            <Grid item={true} sm={6}>
              <Typography>
                <span
                  dangerouslySetInnerHTML={{
                    __html: frenchText.replace(/ {2}/g, "\u00a0\u00a0")
                  }}
                />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    );
  }

  public render() {
    const {
      classes,
      actions,
      epigram,
      filterByImitations,
      showEditLink
    } = this.props;
    const { collapsed } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <IconButton onClick={this.toggleCollapse}>
              {collapsed ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          }
          title={getEpigramTitle(epigram)}
          subheader={collapsed && getEpigramIncipit(epigram)}
          action={
            <ActionsMenu
              epigram={epigram}
              filterByImitations={filterByImitations}
              showEditLink={showEditLink}
            />
          }
        />
        {this.renderEpigramContent()}
        {actions && <CardActions>{actions(epigram)}</CardActions>}
      </Card>
    );
  }
}

export default withStyles(styles)(EpigramView);
