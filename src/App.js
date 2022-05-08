import React, { useEffect, useState } from "react";
import List from "./list";
import Loading from "./loading";

function App() {
  const ListLoading = Loading(List);
  const [appState, setAppState] = useState({
    loading: false,
    issues: null,
    pulls: null,
    branches: null
  });

  //basic fetch to get the information from the API and store it in the state
  //shows loading screen while waiting on the API call
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.github.com/repos/walmartlabs/thorax/issues`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((issues) => {
        const apiUrl2 = `https://api.github.com/repos/walmartlabs/thorax/pulls`;
        fetch(apiUrl2)
          .then((res2) => res2.json())
          .then((pulls) => {
            const apiUrl3 = `https://api.github.com/repos/walmartlabs/thorax/branches`;
            fetch(apiUrl3)
              .then((res3) => res3.json())
              .then((branches) => {
                setAppState({
                  loading: false,
                  issues: issues,
                  pulls: pulls,
                  branches: branches
                });
              });
          });
      });
  }, [setAppState]);
  //Returns the main container for the issue browser
  return (
    <div className="App">
      <div className="issue-container">
        <div className="text-center">
          <ListLoading
            isLoading={appState.loading}
            issues={appState.issues}
            pulls={appState.pulls}
            branches={appState.branches}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
