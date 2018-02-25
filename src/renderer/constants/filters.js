export const allFilters = [
  { name: "Auteur", key: "author" },
  { name: "Référence", key: "reference" },
  { name: "Titre", key: "title" },
  { name: "Mètre", key: "meter" },
  { name: "Strophe", key: "stanza" },
  { name: "Destinataire", key: "addressee" },
  { name: "Thème", key: "themes" },
  { name: "Texte latin", key: "latinText" },
  { name: "Texte français", key: "frenchText" },
  { name: "Notes", key: "notes" }
];

export const getFilterName = key =>
  allFilters.find(filter => filter.key === key).name;
