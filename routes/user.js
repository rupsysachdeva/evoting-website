const express = require('express');
const app = express();
const port = 8000;
const db = require('../db-config');
const routes = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const votedUsers = new Set();

routes.get('', (req, res) => {
    console.log("run run");
    res.render("home.ejs");
});

routes.get("/register", (req, res) => {
    console.log("errrr");
    res.render("register.ejs");
});

routes.get("/parties", (req, res) => {
    res.render("parties.ejs");
});

routes.get("/aboutus", (req, res) => {
    res.render("trial.ejs");
});
routes.get('/login', (req, res) => {
    res.render("login.ejs");
});

routes.get('/givevote', (req, res) => {
    const { user } = req.session; // 

    // Fetch user's name and voter_id from the "register" table
    db.query('SELECT full_name, voter_id FROM register WHERE voter_id = ?', [user.voter_id], (userError, userData) => {
        if (userError) {
            return res.status(500).json({ status: "error", error: "Error fetching user data." });
        }

        if (userData.length === 0) {
            return res.status(404).json({ status: "error", error: "User not found." });
        }

        // Fetch party data from the "group_" table
        db.query('SELECT partyname, partysymbol FROM group_', (groupError, groupData) => {
            if (groupError) {
                return res.status(500).json({ status: "error", error: "Error fetching party data." });
            }

            // Render the "givevote.ejs" template with the fetched user data and party data
            res.render("givevote.ejs", { groupData, user: userData[0] });
        });
    });
});


//route to handle logout
routes.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ status: "error", error: "Error logging out" });
        }

        // Redirect to the main page upon successful logout
        res.redirect('/');
    });
});

//route to handle vote submission

routes.post('/submit-vote', (req, res) => {
    const { party } = req.body;
    const { user } = req.session;

    if (!party) {
        return res.status(400).json({ status: "error", error: "Please provide the party name." });
    }

    // Check if the user has already voted
    if (votedUsers.has(user.voter_id)) {
        return res.status(403).json({ status: "error", error: "You have already voted." });
    }

    // Check if the user's "status" in the "give_vote" table is already set to "yes"
    db.query('SELECT status FROM give_vote WHERE partyname = ? AND voter_id = ?', [party, user.voter_id], (statusError, statusResults) => {
        if (statusError) {
            return res.status(500).json({ status: "error", error: "Error checking vote status." });
        }

        if (statusResults.length === 0) {
            return res.status(404).json({ status: "error", error: "Party not found." });
        }

        const voteStatus = statusResults[0].status;

        if (voteStatus === 'yes') {
            return res.status(403).json({ status: "error", error: "You have already voted." });
        }

        // Fetch the selected party's name from the "group_" table
        db.query('SELECT partyname FROM group_ WHERE partyname = ?', [party], (partyError, partyResult) => {
            if (partyError) {
                return res.status(500).json({ status: "error", error: "Error fetching party name." });
            }

            if (partyResult.length === 0) {
                return res.status(404).json({ status: "error", error: "Party not found." });
            }

            const partyName = partyResult[0].partyname;

            // Start a database transaction to update the vote status and add the user to the set of voted users
            db.beginTransaction((err) => {
                if (err) {
                    return res.status(500).json({ status: "error", error: "Error starting a database transaction." });
                }

                // Update the "status" attribute for the selected party in the "give_vote" table
                db.query('UPDATE give_vote SET status = ? WHERE partyname = ? AND voter_id = ?', ['yes', party, user.voter_id], (error, results) => {
                    if (error) {
                        // Rollback the transaction and return an error response
                        db.rollback(() => {
                            return res.status(500).json({ status: "error", error: "Error updating the vote status." });
                        });
                    }

                    // Increment no_of_votes in the "group_" table for the selected party
                    db.query('UPDATE group_ SET no_of_votes = no_of_votes + 1 WHERE partyname = ?', [party], (updateError, updateResults) => {
                        if (updateError) {
                            // Rollback the transaction and return an error response
                            db.rollback(() => {
                                return res.status(500).json({ status: "error", error: "Error updating no_of_votes." });
                            });
                        }

                        // Commit the transaction after successfully updating the vote status and no_of_votes
                        db.commit((commitErr) => {
                            if (commitErr) {
                                return res.status(500).json({ status: "error", error: "Error committing the database transaction." });
                            }

                            // Add the user to the set of voted users
                            votedUsers.add(user.voter_id);

                            // Return a success response
                            res.status(200).json({ status: "success", message: "Vote submitted successfully" });
                        });
                    });
                });
            });
        });
    });
});
// route to handle party association and incrementing vote count
routes.post('/associate-party', (req, res) => {
    const { party } = req.body;
    const { user } = req.session;
  
    if (!party) {
      return res.status(400).json({ status: 'error', error: 'Please provide the party name.' });
    }
  
    // Check if the party name exists in the group_ table
    db.query('SELECT partyname FROM group_ WHERE partyname = ?', [party], (partyError, partyResult) => {
      if (partyError) {
        return res.status(500).json({ status: 'error', error: 'Error checking party name in group_ table.' });
      }
  
      if (partyResult.length === 0) {
        return res.status(404).json({ status: 'error', error: 'Party not found.' });
      }
  
      const partyName = partyResult[0].partyname;
  
      // Associate the party name with the user's full_name in the give_vote1 table
      db.query(
        'UPDATE give_vote1 SET partyname = ? WHERE full_name = ?',
        [partyName, user.full_name],
        (associationError, associationResult) => {
          if (associationError) {
            return res.status(500).json({ status: 'error', error: 'Error associating party with user.' });
          }
  
          // Increment no_of_votes in the group_ table for the selected party
          db.query('UPDATE group_ SET no_of_votes = no_of_votes + 1 WHERE partyname = ?', [party], (updateError, updateResults) => {
            if (updateError) {
              return res.status(500).json({ status: 'error', error: 'Error updating no_of_votes.' });
            }
  
            // Return a success response
            res.status(200).json({ status: 'success', message: 'Party association successful.' });
          });
        }
      );
    });
  });
  

// Add this route to handle group registration
routes.post('/group', upload.single('partysymbol'), (req, res) => {
    const { partyname } = req.body;
    const partysymbol = req.file;

    if (!partyname || !partysymbol) {
        return res.status(400).json({ status: "error", error: "Please provide both Party Name and Party Symbol." });
    }

    // Check if the "partysymbol" is not null or empty
    if (!partysymbol.buffer) {
        return res.status(400).json({ status: "error", error: "Party Symbol cannot be empty." });
    }

    // Create an object to hold the group registration data
    const groupData = {
        partyname: partyname,
        partysymbol: partysymbol.buffer, // Save the image buffer in the database
    };

    // Insert the group registration data into the "group_" table in the database
    db.query('INSERT INTO group_ (partyname, partysymbol) VALUES (?, ?)', [groupData.partyname, groupData.partysymbol], (error, results) => {
        if (error) {
            console.error("Error inserting data into group_ table:", error);
            return res.status(500).json({ status: "error", error: "Group registration failed." });
        }

        // Now, insert the same data into the "give_vote1" table
        db.query('INSERT INTO give_vote1 (full_name, aadhar_card_no, voter_id, partyname) VALUES (?, ?, ?, ?)', [user.name, user.aadhar_card_no, user.voter_id, groupData.partyname], (insertError, insertResults) => {
            if (insertError) {
                console.error("Error inserting data into give_vote1 table:", insertError);
                return res.status(500).json({ status: "error", error: "Error inserting data into give_vote1 table" });
            }

            // Redirect to a success page or handle the success response as needed
            res.status(200).json({ status: "success", message: "Group registration successful" });
        });
    });
});

// Login route
routes.post('/login', (req, res) => {
    const { voter_id, aadhar_card_no } = req.body;

    if (!voter_id || !aadhar_card_no) {
        return res.status(400).json({ status: "error", error: "Please provide both Voter ID and Aadhar Card Number." });
    }

    // Check if the provided voter_id exists in the give_vote1 table
    db.query('SELECT voter_id FROM give_vote1 WHERE voter_id = ?', [voter_id], (vote1Error, vote1Result) => {
        if (vote1Error) {
            return res.status(500).json({ status: "error", error: "Error checking voter_id in give_vote1 table." });
        }

        if (vote1Result.length > 0) {
            // If the voter_id exists in give_vote1, return an error response
            return res.status(403).json({ status: "error", error: "You cannot login more than once." });
            
        }

        // Continue with the existing logic to check if the provided voter_id and aadhar_card_no match an existing user in the "register" table
        db.query('SELECT full_name, voter_id, aadhar_card_no FROM register WHERE voter_id = ? AND aadhar_card_no = ?', [voter_id, aadhar_card_no], (err, result) => {
            if (err) {
                return res.status(500).json({ status: "error", error: "Database error" });
            }

            if (result.length > 0) {
                const user = {
                    name: result[0].full_name,
                    voter_id: result[0].voter_id,
                    aadhar_card_no: result[0].aadhar_card_no,
                };

                // Set the user data in the session
                req.session.user = user;

                // Fetch the party name from the "group_" table
                db.query('SELECT partyname FROM group_', (partyError, partyResult) => {
                    if (partyError) {
                        return res.status(500).json({ status: "error", error: "Error fetching party name." });
                    }

                    if (partyResult.length === 0) {
                        return res.status(404).json({ status: "error", error: "No party found." });
                    }

                    const partyName = partyResult[0].partyname;

                    // Insert user data into the "give_vote1" table
                    db.query('INSERT INTO give_vote1 (full_name, voter_id, aadhar_card_no, partyname) VALUES (?, ?, ?, ?)', [user.name, user.voter_id, user.aadhar_card_no, partyName], (insertError, insertResults) => {
                        if (insertError) {
                            console.error("Error inserting data into give_vote1 table:", insertError);
                            return res.status(500).json({ status: "error", error: "Error inserting data into give_vote1 table" });
                        }

                        // Redirect to the main page upon successful login
                        return res.redirect('/givevote');
                    });
                });
            } else {
                // If the login fails, redirect to the "register" page
                return res.redirect('/register');
            }
        });
    });
});


// Registration route
routes.post('/register', (req, res) => {
    const { full_name, aadhar_card_no, voter_id, phone_no, birth_date, gender, address_line1, address_line2, address_line3 } = req.body;

    if (!full_name || !aadhar_card_no || !voter_id || !phone_no || !birth_date || !gender || !address_line1) {
        // If any required fields are missing, return an error response
        return res.status(400).json({ status: "error", error: "Please provide all required information." });
    }

    // Check if the user already exists in the database based on aadhar_card_no and voter_id
    db.query('SELECT full_name FROM register WHERE aadhar_card_no = ? AND voter_id = ?', [aadhar_card_no, voter_id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", error: "Database error" });
        }

        if (result.length > 0) {
            return res.status(409).json({ status: "error", error: "User already registered" });
        } else {
            // If the user doesn't exist, insert the registration data into the database
            const registrationData = {
                full_name,
                aadhar_card_no,
                voter_id,
                phone_no,
                birth_date,
                gender,
                address_line1,
                address_line2,
                address_line3,
            };

            db.query('INSERT INTO register SET ?', registrationData, (error, results) => {
                if (error) {
                    console.error("Error inserting data into register table:", error);
                    return res.status(500).json({ status: "error", error: "Registration failed." });
                }

                // Redirect to the "index.ejs" page after successful registration
                res.redirect('/login');
            });
        }
    });
});

module.exports = routes;
