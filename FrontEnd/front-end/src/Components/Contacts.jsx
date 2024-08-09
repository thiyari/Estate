import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminSidebar from "./Sidebar/AdminSidebar";
import { IoIosMail } from "react-icons/io";
import Checkbox from "./Checkbox/Checkbox";

function Contacts(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [contacts, setContacts] = useState([])
    const navigate = useNavigate()
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [allEmails, setAllEmails] = useState([])
    const [userinfo, setUserInfo] = useState({
      emails: [],
      response: [],
    });

    const session = useCallback(async () =>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/session`)
        .then(res => {
          if(res.data.valid){
            setLoggedIn(res.data.isLoggedIn);
            props.LoginStatus(loggedIn);
          } else {
            props.LoginStatus(!loggedIn);
            navigate('/Login')
          }
        })
        .catch(err => console.log(err))
      },[props, loggedIn, navigate])


      const records = useCallback(async()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/contacts`)
            .then(res => {
                const records = res.data.records
                let contacts_list = []
                let all_emails = []
                for (let i = 0; i < records.length;  i++) {
                    contacts_list.push(records[i])
                    all_emails.push(records[i].email)
                }
                setContacts(contacts_list)
                setAllEmails(all_emails)
            })
    },[]);


    const handleDelete = async (fname, lname, Id) => {
      if(window.confirm(`Are you sure deleting this current contact ${fname} ${lname}!`)){
      try{
        await axios.delete(`${process.env.REACT_APP_SERVER_URI}/api/contacts/delete/${Id}`, 
          { headers: { "Content-Type":"application/json" } })
          alert(`${fname} ${lname} Deleted Successfully`);
          window.location.reload();
        } catch (err) {
          alert(err);
        }
      }
    };

      axios.defaults.withCredentials = true;
      useEffect(()=>{
        session();
        records();
      },[session, records])

      const handleSelectAll = (e) => {
        const {value} = e.target
        const { emails } = userinfo;

        setIsCheckAll(!isCheckAll);
        setIsCheck(contacts.map((contact) => contact._id));

        // Case 1 : The user unchecks the box

        if (isCheckAll) {
          setIsCheck([]);
          setUserInfo({
            emails: emails.filter(
                (e) => e !== value
            ),
            response: emails.filter(
                (e) => e !== value
            ),
        });
        } 

        // Case 2  : The user checks the box

        else {
          setUserInfo({
            emails: [...emails, value],
            response: [...emails, value],
        });
        }
      };

      const handleClick = (e) => {
        const { id, checked, value } = e.target;
        const { emails } = userinfo;
        setIsCheckAll(false)

        setIsCheck([...isCheck, id]);
        
        
        // Case 1 : The user unchecks the box
        if (!checked) {
          setIsCheck(isCheck.filter(item => item !== id));
          setUserInfo({
            emails: emails.filter(
                (e) => e !== value
            ),
            response: emails.filter(
                (e) => e !== value
            ),
        });
        }

        // Case 2  : The user checks the box
        else {

          setUserInfo({
            emails: [...emails, value],
            response: [...emails, value],
        });
      }

      };
    
    return(
        <React.Fragment>
        <div className="row">
        <div className="col-md-2">        
          <AdminSidebar/>
        </div>
        <div className="col-md-10" style={{paddingLeft: 30}}>
      
      
        <div className="container mt-4" >
          <div className="card">
          <h1 className="card-header">
            <center>
              <div className="header-font">List of All Contacts</div>
            </center>
          </h1>
            <div className="form-container">
                <div className="card-body">
                
                <form action='/AddNewContact'>
                <div className ="table-responsive-md" style={{ maxHeight: "300px", overflowY: "auto" }}>  
                  <table className="table table-striped table-hover">
                    <thead style={{ position: "sticky", top: "0" }}>
                    <tr>
                      <th scope="col">  
                        <Checkbox
                          type="checkbox"
                          name="selectAll"
                          id="selectAll"
                          handleClick={handleSelectAll}
                          isChecked={isCheckAll}
                          value={allEmails}
                          /> Select All  
                      </th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th colSpan={2} style={{textAlign: "center"}}>
                        <button type="submit" className="btn btn-primary" style={{width: 100, height: 35}}>Add New</button>
                      </th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {contacts.map((contact, index)=>{return(
                                            <tr key={index}>
                                              <td>
                                                <Checkbox
                                                  type="checkbox"
                                                  name="emails"
                                                  id={contact._id}
                                                  value={contact.email}
                                                  handleClick={handleClick}
                                                  isChecked={isCheck.includes(contact._id)}
                                                />
                                              </td>
                                              <td>{contact.firstname}</td>
                                              <td>{contact.lastname}</td>
                                              <td>{contact.email}</td>
                                              <td>{contact.phone}</td>
                                              <td align='right'><NavLink exact="true" to={`/EmailForm/${contact.email}`} ><IoIosMail size={20}/>
                                              </NavLink></td>
                                              <td align='center'><button style={{width: 25}} onClick={(e)=>{
                                                e.preventDefault()
                                                handleDelete(contact.firstname, contact.lastname, contact._id)
                                                }}><i className="fas fa-trash-alt"></i></button></td>
                                            </tr>
                                              )}
                                            )}
                    </tbody>
                    </table>
                    </div>
                    <div className="form-control mt-3 mb-3 text-center">
                            <label htmlFor="exampleFormControlTextarea1">
                                Receipents Address for Email Campaigning:{" "}
                            </label>
                            <textarea
                                className="form-control text"
                                name="response"
                                value={userinfo.response}
                                placeholder="The checkbox values will be displayed here "
                                id="floatingTextarea2"
                                style={{ height: "150px" }}
                                onChange={ !isCheckAll? handleSelectAll: handleClick }
                            ></textarea>
                        </div>
                </form>        
                
                </div>       
            </div>
            </div>
        </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default Contacts;

