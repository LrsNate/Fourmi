import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from "@material-ui/core";
import * as React from "react";
import { Epigram } from "../../constants/types";
import { Filter, SearchQuery } from "../../reducers/search";
import AddFilter from "./AddFilter";
import Filters from "./Filters";

interface SearchCardProps {
  query: SearchQuery;
  results: Epigram[];
  addFilter: (filter: Filter) => void;
  setSearchPhrase: (phrase: string) => void;
  resetSearchQuery: () => void;
}

export default class SearchCard extends React.Component<SearchCardProps> {
  public handleSetSearchPhrase = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { setSearchPhrase } = this.props;
    const phrase = event.target.value;

    setSearchPhrase(phrase);
  };

  public handleReset = () => {
    this.props.resetSearchQuery();
  };

  public render() {
    const { query, results, addFilter } = this.props;

    return (
      <Card>
        <CardContent>
          <TextField
            placeholder="Rechercher..."
            value={query.phrase}
            onChange={this.handleSetSearchPhrase}
            fullWidth
            margin="normal"
          />
          <Filters query={query} />
          <Typography>
            {results.length} résultat{results.length > 1 && "s"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={this.handleReset}>Réinitialiser</Button>
          <AddFilter query={query} onSubmit={addFilter} />
        </CardActions>
      </Card>
    );
  }
}
