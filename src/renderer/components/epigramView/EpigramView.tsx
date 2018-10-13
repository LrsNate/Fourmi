import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  withStyles
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import * as React from "react";
import { Epigram } from "../../constants/types";
import { getEpigramIncipit, getEpigramTitle } from "../../lib/epigrams/display";
import ActionsMenu from "./ActionsMenu";
import EpigramAttributes from "./EpigramAttributes";
import TextView from "./TextView";

const styles = {
  header: { cursor: "pointer" }
};

interface EpigramViewProps {
  actions?: (epigram: Epigram) => React.ReactNode;
  classes: { header: string };
  epigram: Epigram;
  showEditLink?: boolean;
  startExpanded?: boolean;
  filterByImitations?: (id: string) => void;
}

interface EpigramViewState {
  collapsed: boolean;
}

class EpigramView extends React.Component<EpigramViewProps, EpigramViewState> {
  public constructor(props: EpigramViewProps) {
    super(props);
    this.state = {
      collapsed: !props.startExpanded
    };
  }

  public toggleCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  public render() {
    const {
      actions,
      classes,
      epigram,
      filterByImitations,
      showEditLink
    } = this.props;
    const { collapsed } = this.state;

    return (
      <Card>
        <CardHeader
          className={classes.header}
          onClick={this.toggleCollapse}
          avatar={
            <IconButton>
              {collapsed ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          }
          title={getEpigramTitle(epigram)}
          subheader={collapsed && getEpigramIncipit(epigram)}
          action={
            showEditLink &&
            filterByImitations && (
              <ActionsMenu
                epigram={epigram}
                filterByImitations={filterByImitations}
                showEditLink={showEditLink}
              />
            )
          }
        />
        {this.renderEpigramContent()}
        {actions && <CardActions>{actions(epigram)}</CardActions>}
      </Card>
    );
  }

  private renderEpigramContent() {
    const { epigram } = this.props;
    const { collapsed } = this.state;

    return (
      <Collapse in={!collapsed}>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <EpigramAttributes epigram={epigram} />
            </Grid>
            <Grid item sm={6}>
              <TextView text={epigram.latinText || ""} />
            </Grid>
            <Grid item sm={6}>
              <TextView text={epigram.frenchText || ""} />
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    );
  }
}

export default withStyles(styles)(EpigramView);
