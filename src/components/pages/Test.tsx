import React from 'react'
import Papa from "papaparse";
import { firestore } from "../../Fire.js";
import { CSVLink } from "react-csv";

type MyProps = {  };
type MyState = { 
    usersImport: Array<Object>, 
    usersExport: Array<Object>, 
    existingEmail10k: string, 
    existingEmail50k: string, 
    nonExistEmail: string, 
    csv50kUrl: string, 
    csv10kUrl: string, 
    uploadingUsers: boolean,
    downloadingUsers: boolean
 };

export default class Test extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props)
    
        this.state = {
            usersImport: [],
            usersExport: [],
            existingEmail10k: "shanice.westfall@yahoo.com",
            existingEmail50k: "shanice.westfall@yahoo.com",
            nonExistEmail: "mattie@aol.com",
            csv50kUrl: "https://firebasestorage.googleapis.com/v0/b/dougs-react-boiler.appspot.com/o/50000%20Records.csv?alt=media&token=369186c8-ce61-4af1-86fa-7f0d5745eaf6",
            csv10kUrl: "https://firebasestorage.googleapis.com/v0/b/dougs-react-boiler.appspot.com/o/10000%20Records.csv?alt=media&token=8cf0a63f-75a4-4515-bb79-a4723fe5a341",
            uploadingUsers: false,
            downloadingUsers: false
        }
    }
    
    importUsersCsv = (csvUrl: any) => {
        let users: any = [];
        Papa.parse(
            csvUrl,
            {
                download: true,
                header: true,
                worker: true,
                step: (results: any) => {
                    if((results.data['First Name'] || results.data['Last Name'] || results.data['E Mail']) !== undefined){
                        users.push({
                            firstName: results.data['First Name'],
                            lastName: results.data['Last Name'],
                            email: results.data['E Mail'],
                            timestamp: Date.now(),
                        })
                        console.log(`User ${results.data['E Mail']} submitted successfully.`)
                    }
                },
                error: (err) => {
                    console.error("Error: " + err)
                },
                complete: () => {
                    this.setState({ usersImport: users })
                    alert("Parsing complete and added to React State")
                }
            }
        );

        // TODO: this is capping at 18854 length
    }

    exportUsersToFirestore = async () => {
        let batchArray: any = [];
        batchArray.push(firestore.batch());
        let operationCounter = 0;
        let batchIndex = 0;
        this.setState({ uploadingUsers: true })
        this.state.usersImport.forEach(user => {
            const usersRef = firestore.collection('users').doc();
            batchArray[batchIndex].set(usersRef, user, { merge: true });
            operationCounter++;

            if (operationCounter === 499) {
                batchArray.push(firestore.batch());
                batchIndex++;
                operationCounter = 0;
            }
        });

        let itemsProcessed = 0;
        batchArray.forEach(async (batch: any) => {
            itemsProcessed++;
            await batch.commit();
            if(itemsProcessed === batchArray.length){
                this.setState({ uploadingUsers: false })
            }
        });
        

    }

    importAllUsersFromFirestore = () => {
        let users: any = [];
        this.setState({ downloadingUsers: true })
        firestore.collection("users").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users.push(doc.data())
                });

                this.setState({ usersExport: users, downloadingUsers: false })
            }).catch((error) => {
                console.error("Error getting documents: ", error);
            });
    }

    checkUserExists = (email: any) => {
        firestore.collection("users").where("email", "==", email).get()
            .then((querySnapshot) => {
                if(querySnapshot.empty){
                    alert("Email DOES NOT exists!")
                } else {
                    querySnapshot.forEach((doc) => {
                        alert("Email exists!")
                        console.log(doc.id, " => ", doc.data());
                    });
                }
               
            }).catch((error) => {
                console.error("Error getting documents: ", error);
            });
    }


    render() {
        return (
            <div className="wrapper">
                <h1>Testing Page</h1>
                <h2>Posting</h2>
                <div>
                    <button onClick={() => this.importUsersCsv(this.state.csv10kUrl)} className="md-blue-btn">
                        Import 10k Users CSV
                    </button>

                    <button onClick={() => this.importUsersCsv(this.state.csv50kUrl)} className="md-blue-btn">
                        Import 50k Users CSV
                    </button>
                </div>

                <label>usersImport: </label>{this.state.usersImport.length}

                <br/><br/>
                <div>
                    <button onClick={() => this.exportUsersToFirestore()} className="md-blue-btn">
                        Export Users to Firestore
                    </button>
                    &nbsp;&nbsp;
                    {this.state.uploadingUsers && (
                        <span className="green"><i className="fas fa-spinner fa-spin"></i> uploading...</span>
                    )}
                    
                </div>

                <br/>
                <div>
                    <button onClick={() => this.importAllUsersFromFirestore()} className="md-blue-btn">
                        Import Users from Firestore
                    </button>
                    &nbsp;&nbsp;
                    {this.state.downloadingUsers && (
                        <span className="green"><i className="fas fa-spinner fa-spin"></i> downloading...</span>
                    )}
                </div>

                <label>usersExport: </label>{this.state.usersExport.length}

                <br/><br/>
                <div>
                    <CSVLink data={this.state.usersExport}><button className="md-blue-btn">Download users CSV</button></CSVLink>
                </div>
                <br/>
                <hr/>
                <br/>
                <h2>Checking</h2>
                <div>
                    <button onClick={() => this.checkUserExists(this.state.existingEmail10k)} className="md-blue-btn">
                        Check for should be existing email
                    </button>
                    &nbsp;&nbsp;
                    <button onClick={() => this.checkUserExists(this.state.existingEmail50k)} className="md-blue-btn">
                        Check for should be existing email
                    </button>
                    &nbsp;&nbsp;
                    <button onClick={() => this.checkUserExists(this.state.nonExistEmail)} className="md-blue-btn">
                        Check for NON-existing email
                    </button>
                </div>
            </div>
        )
    }
}
