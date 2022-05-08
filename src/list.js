import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

let num = 0;
let pageName = "Issues";

// Set num to the clicked issue's number
function handle(n) {
  num = n;
}

// Set page to the clicked page number
function changePage(st) {
  pageName = st;
}

const List = (props) => {
  const { issues, pulls, branches } = props;

  // Setting  up states
  const [isClicked, setClicked] = useState(false);
  const [isPage, setPage] = useState(false);

  // In case there are no issues
  if (!issues || issues.length === 0) return <p>No issues</p>;

  // Triggers page updata
  if (isPage) {
    setPage(false);
  }

  // Determines number of page tabs to be put at the top
  let numPages = 3;
  //Math.ceil(issues.length / 10);

  //makes a sublist of 10 or fewer issues to be displayed on a given page
  const sublist = [];

  if (pageName === "Issues") {
    sublist.length = 0;
    for (let i = 0; i < issues.length; i++) {
      sublist.push(issues[i]);
    }
  }

  if (pageName === "Pulls") {
    sublist.length = 0;
    for (let i = 0; i < pulls.length; i++) {
      sublist.push(pulls[i]);
    }
  }

  if (pageName === "Branches") {
    sublist.length = 0;
    for (let i = 0; i < pulls.length; i++) {
      sublist.push(branches[i]);
    }
  }
  // for (let i = pageNumber * 10; i < pageNumber * 10 + 10; i++) {
  //   if (i < issues.length) {
  //     sublist.push(issues[i]);
  //   }
  // }

  //makes the list of pages to easily create buttons
  const pages = ["Issues", "Pulls", "Branches"];
  // for (let i = 1; i <= numPages; i++) {
  //   pages.push(i);
  // }

  //returns the list screen elements to be rendered
  if (!isClicked)
    if (pageName === "Branches")
      return (
        <ButtonGroup vertical>
          <div className="container">
            <h1>Github Stats</h1>
          </div>
          <ButtonGroup className="mr-2" aria-label="First group">
            {pages.map((page) => {
              return (
                <Button
                  key={page}
                  //begins the page change when a page button is clicked
                  onClick={function (event) {
                    changePage(page);
                    setPage(true);
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </ButtonGroup>
          <ButtonGroup vertical>
            {sublist.map((issue) => {
              return (
                <Card
                  key={issue.number}
                  className="listClass"
                  variant="outline-primary"
                  style={{ width: "50rem" }}
                  //begins the process of showing more info about an issue
                  onClick={function (event) {
                    setClicked(true);
                    handle(issue.number);
                  }}
                >
                  <Card.Header as="h5">{issue.name}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <b>Hash: </b> {issue.commit.sha}
                    </Card.Text>
                    <Card.Text>
                      <b>URL: </b> {issue.commit.url}
                    </Card.Text>
                    <Card.Text>
                      <b>Protected: </b> {issue.protected.toString()}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </ButtonGroup>
          <footer>
            <p />
            <div className="footer">Made By: Ben Sutter and Paul Kim</div>
          </footer>
        </ButtonGroup>
      );
    else
      return (
        <ButtonGroup vertical>
          <div className="container">
            <h1>Github Stats</h1>
          </div>
          <ButtonGroup className="mr-2" aria-label="First group">
            {pages.map((page) => {
              return (
                <Button
                  key={page}
                  //begins the page change when a page button is clicked
                  onClick={function (event) {
                    changePage(page);
                    setPage(true);
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </ButtonGroup>
          <ButtonGroup vertical>
            {sublist.map((issue) => {
              return (
                <Card
                  key={issue.number}
                  className="listClass"
                  variant="outline-primary"
                  style={{ width: "50rem" }}
                  //begins the process of showing more info about an issue
                  onClick={function (event) {
                    setClicked(true);
                    handle(issue.number);
                  }}
                >
                  <Card.Header as="h5">{issue.title}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <b>Number: </b> {issue.number}
                    </Card.Text>
                    <Card.Text>
                      <b>State: </b> {issue.state}
                    </Card.Text>
                    <Button variant="primary">More Info</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </ButtonGroup>
          <footer>
            <p />
            <div className="footer">Made By: Ben Sutter and Paul Kim</div>
          </footer>
        </ButtonGroup>
      );

  //returns the more information screen elements to be rendered instead of the list screen.
  //I used a new if statement here instead of an else to help make the code easier to understand even though it does the same thing
  if (isClicked) {
    for (let i = 0; i < sublist.length; i++) {
      if (sublist[i].number === num) {
        let issue = sublist[i];
        return (
          <div className="Issue">
            <h4>{issue.title}</h4>
            <p />
            <b>Issue Number: </b> {issue.number}
            <p />
            <b>State: </b> {issue.state}
            <p />
            <b>Owner: </b> {issue.user.login}
            <p />
            <b>Created Time: </b> {issue.created_at}
            <p />
            <b>Updated Time: </b> {issue.updated_at}
            <p />
            <b>Body: </b> {issue.body}
            <p />
            <Button
              key={issue.number}
              className="listClass"
              variant="outline-primary"
              onClick={function (event) {
                setClicked(false);
              }}
            >
              Back
            </Button>
          </div>
        );
      }
    }
  }
};
export default List;
