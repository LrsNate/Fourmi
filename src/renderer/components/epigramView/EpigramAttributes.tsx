import { Grid, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import { Epigram } from "../../constants/types";

interface FieldValueProps {
  field: string;
}

interface EmptyValueProps {
  classes: { emptyValue: string };
}

const emptyValueStyles = {
  emptyValue: {
    color: "#757575"
  }
};

const UnstyledEmptyValue: React.SFC<EmptyValueProps> = ({ classes }) => (
  <span className={classes.emptyValue}>(vide)</span>
);

const EmptyValue = withStyles(emptyValueStyles)(UnstyledEmptyValue);

interface TextValueProps extends FieldValueProps {
  value?: string;
}

const TextValue: React.SFC<TextValueProps> = ({ field, value }) => (
  <Typography>
    <strong>{field} :</strong> {value || <EmptyValue />}
  </Typography>
);

interface ListValueProps extends FieldValueProps {
  value?: string[];
}

const ListValue: React.SFC<ListValueProps> = ({ field, value }) => (
  <Typography>
    <strong>{field} :</strong> {value ? value.join(", ") : <EmptyValue />}
  </Typography>
);

interface EpigramAttributesProps {
  epigram: Epigram;
}

const EpigramAttributes: React.SFC<EpigramAttributesProps> = ({ epigram }) => {
  return (
    <Grid container spacing={8}>
      <Grid item sm={3}>
        <TextValue field="Destinataire" value={epigram.addressee} />
      </Grid>
      <Grid item sm={3}>
        <TextValue field="Date" value={String(epigram.date)} />
      </Grid>
      <Grid item sm={3}>
        <TextValue field="Mètre" value={epigram.meter} />
      </Grid>
      <Grid item sm={3}>
        <TextValue field="Strophe" value={epigram.stanza} />
      </Grid>
      <Grid item sm={6}>
        <TextValue field="Notes" value={epigram.notes} />
      </Grid>
      <Grid item sm={6}>
        <ListValue field="Thèmes" value={epigram.themes} />
      </Grid>
    </Grid>
  );
};

export default EpigramAttributes;
