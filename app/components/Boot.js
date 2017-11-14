import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import {
  ensureDatabaseExistsAction,
  ensureDatabaseFolderExistsAction
} from "../actions/database";
import {
  databaseFolderFoundType,
  databaseFolderNotFoundType,
  databaseFolderReadyType,
  databaseFoundType,
  databaseNotFoundType,
  databaseReadyType
} from "../constants/actions/database";
import { getDataFolderPath } from "../lib/files";

const messageTemplates = {
  [databaseFolderFoundType]: `Le dossier de données existe à : "${getDataFolderPath()}".`,
  [databaseFolderNotFoundType]:
    `Le dossier de données n'a pas pu être trouvé ; ` +
    `création du dossier "${getDataFolderPath()}"...`,
  [databaseFolderReadyType]: `Le dossier de données est prêt.`,
  [databaseFoundType]: "La base de données a été trouvée.",
  [databaseNotFoundType]:
    "La base de données n'a pas pu être trouvée. Téléchargement en cours...",
  [databaseReadyType]: "La base de données est prête. Redirection en cours..."
};

export class Boot extends Component {
  componentWillMount() {
    this.props.initializeDatabase();
  }

  componentWillUpdate(nextProps) {
    const { messages, redirectToSearchPage } = nextProps;

    if (messages.includes(databaseReadyType)) {
      redirectToSearchPage();
    }
  }

  render() {
    const { messages } = this.props;

    return (
      <ul>
        {messages.map(message => (
          <li key={message}>{messageTemplates[message]}</li>
        ))}
      </ul>
    );
  }
}

Boot.propTypes = {
  initializeDatabase: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired
};

export const mapStateToProps = state => {
  const { statusHistory } = state.database;

  return { messages: statusHistory };
};

export const mapDispatchToProps = dispatch => ({
  initializeDatabase() {
    return dispatch(ensureDatabaseFolderExistsAction()).then(() =>
      dispatch(ensureDatabaseExistsAction())
    );
  },
  redirectToSearchPage() {
    return dispatch(push("/search"));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Boot);
