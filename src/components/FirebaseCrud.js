import React, { useState, useEffect } from "react";
import firebase from "./Firebase";
import {
  Container,
  Grid,
  Segment,
  Button,
  Form,
  Header,
  Table,
  Icon,
} from "semantic-ui-react";
import './css/AddUserForm.css';



const FirebaseCrud = () => {
  // Store the data inserted from the form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Storing user info
  const [userData, setUserData] = useState([]);

  // Updating
  const [uFirstName, setuFirstName] = useState("");
  const [uLastName, setuLastName] = useState("");
  const [userId, setUserId] = useState(""); // used when updating or deleting

  // Getting data from firebase
  useEffect(() => {
    const firestore = firebase.database().ref("/UserInfo");
    firestore.on("value", (response) => {
      const data = response.val();
      let userInfo = [];
      for (let id in data) {
        userInfo.push({
          id: id,
          First_Name: data[id].First_Name,
          Last_Name: data[id].Last_Name,
        });
      }
      setUserData(userInfo);
    });
  }, []);

  // handleAddUser send the data in the form to firebase
  const handleAddUser = () => {
    // UserInfo is the name of the db we are creating in firebase
    const firestore = firebase.database().ref("/UserInfo");

    let data = {
      // data obj contains the values from the input fields of the form
      First_Name: firstName,
      Last_Name: lastName,
    };
    firestore.push(data); // Sending the data to firebase db

    // Once button is clicked refresh the form
    setFirstName("");
    setLastName("");
  };

  // Updating user information once the button is clicked in update form
  const handleUpdateUser = () => {
    const firestore = firebase.database().ref("/UserInfo").child(userId); // for a particular userId
    firestore.update({
      First_Name: uFirstName,
      Last_Name: uLastName,
    });

    // Once button is clicked refresh the form
    setuFirstName("");
    setuLastName("");
  };

  // Locate the entry when update button is clicked from table
  const handleUpdateClick = (data) => {
    setuFirstName(data.First_Name);
    setuLastName(data.Last_Name);
    setUserId(data.id);
  };

  // Delete User
  const handleDeleteUser = (id) => {
    const firestore = firebase.database().ref("/UserInfo").child(id);
    firestore.remove();
  };

  // padded="very" adds padding to segments

  // ----- Formating Add User Form START -----

  // const useStyles = makeStyles((theme) => ({
  //   add_btn: {
  //     backgroundColor: "#4CAF50",
  //     border: "none",
  //     color: "white",
  //     padding: "15px 32px",
  //     textAlign: "center",
  //     textDecoration: "none",
  //     display: "inline-block",
  //     fontSize: "16px",
  //   },
  // }));

  // ----- Formating Add User Form END -----

  return (
    // The divider adds some padding to the top
    <div class="ui hidden divider">
      <Container>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column>
              {/* --- Inserting Form START---- */}
              <Segment padded="very">
                <Form>
                  <Form.Field>
                    <label>First Name</label>
                    <input
                      placeholder="Enter First Name"
                      focus
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name</label>
                    <input
                      placeholder="Enter Last Name"
                      focus
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Button
                    type="submit"
                    onClick={() => {
                      handleAddUser();
                    }}
                    
                    className="add_btn"
                  >
                    {""}
                    <Icon name="user plus"></Icon>
                    Add
                  </Button>
                </Form>
              </Segment>
              {/* --- Inserting Form END---- */}
            </Grid.Column>
            <Grid.Column>
              {/* --- Updating Form START---- */}
              <Segment padded="very">
                <Form>
                  <Form.Field>
                    <label>First Name</label>
                    <input
                      placeholder="Enter First Name"
                      focus
                      value={uFirstName}
                      onChange={(e) => {
                        setuFirstName(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name</label>
                    <input
                      placeholder="Enter Last Name"
                      focus
                      value={uLastName}
                      onChange={(e) => {
                        setuLastName(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Button
                    type="submit"
                    onClick={() => {
                      handleUpdateUser();
                    }}
                    primary
                  >
                    {""}
                    <Icon name="cog"></Icon>
                    Update
                  </Button>
                </Form>
              </Segment>
              {/* --- Updating Form END---- */}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="1">
            <Grid.Column>
              {/* Checking if the db has no content */}
              {userData.lenth === 0 ? (
                <Segment padded="very">
                  <Header textAlign="center">
                    There is no data available!
                  </Header>
                </Segment>
              ) : (
                <Segment padded="very">
                  {/* Creating table with content from db */}
                  {/* ----- Table START ----- */}
                  <Table celled fixed singleLine>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell> FirstName </Table.HeaderCell>
                        <Table.HeaderCell> LastName </Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {userData.map((data, index) => {
                      return (
                        <Table.Body>
                          <Table.Cell>{data.First_Name}</Table.Cell>
                          <Table.Cell>{data.Last_Name}</Table.Cell>
                          <Table.Cell>
                            <Button
                              color="blue"
                              onClick={() => {
                                handleUpdateClick(data);
                              }}
                            >
                              <Icon name="edit"></Icon>
                              Update
                            </Button>
                            <Button
                              color="red"
                              onClick={() => {
                                handleDeleteUser(data.id);
                              }}
                            >
                              <Icon name="delete"></Icon>
                              Delete
                            </Button>
                          </Table.Cell>
                        </Table.Body>
                      );
                    })}
                  </Table>
                  {/* ----- Table END ----- */}
                </Segment>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default FirebaseCrud;
