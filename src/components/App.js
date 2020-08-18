import React from "react";

import PathSettings from "./PathSettings/PathSettings";
import Grid from "./Grid/Grid";
import Legend from "./Legend/Legend";

const App = () => {
  return (
    <div>
      <PathSettings />
      <Legend />
      <Grid />
    </div>
  );
};

export default App;
