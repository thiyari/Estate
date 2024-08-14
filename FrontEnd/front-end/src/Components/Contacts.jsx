import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminSidebar from "./Sidebar/AdminSidebar";
import { IoIosMail } from "react-icons/io";
import Checkbox from "./Checkbox/Checkbox";
import { PiUploadSimpleBold } from "react-icons/pi";

function Contacts(props) {

	const initialState = {
		to: "",
		subject: "",
		message: "",
		to_status: "",
		subject_status: "",
		messsage_status: ""
	}

		const [loggedIn, setLoggedIn] = useState(false)
		const [contacts, setContacts] = useState([])
		const [selected, setSelected] = useState([]);
		const [subject, setSubject] = useState("");
		const [message, setMessage] = useState("");
		const [formError, setFormError] = useState({...initialState})
		const [files, setFiles] = useState([])
		const navigate = useNavigate()

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
								for (let i = 0; i < records.length;  i++) {
										contacts_list.push(records[i])
								}
								setContacts(contacts_list)
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

			// Initialize an object to track input errors
			let inputError = {...initialState};

			function handleSelect(value, name) {

				if (value) {
					setSelected([...selected, name]);
				} else {
					setSelected(selected.filter((contact) => contact !== name));
				}
			};
			
			function selectAll(value) {

				if (value) { // if true
				 setSelected(contacts.map((contact)=>contact.email)); // select all
				} else { // if false
					setSelected([]); // unselect all
				}
			};

			const handleSubmit = async (e) => {
				e.preventDefault();

					// Check if to address is empty
					if(selected.length === 0){
						setFormError({
							...inputError,
							to: "Please select the receipents address",
							to_status: "error"
						})
						return;
					}

					// Check if subject is empty
					if(!subject){
						setFormError({
							...inputError,
							subject: "Please enter the Subject",
							subject_status: "error"
						})
						return;
					}

					// Check if message is empty
					if(!message){
						setFormError({
							...inputError,
							message: "Please type your message",
							message_status: "error"
						})
						return;
					}          

					// Clear any previous errors
					setFormError(inputError);

					const formData = new FormData();
					formData.append("to",selected)
					formData.append("subject",subject)
					formData.append("message",message)
					for(let i =0; i < files.length; i++) {
						formData.append("files", files[i]);
					}

				try 
					{
					await fetch(`${process.env.REACT_APP_SERVER_URI}/send-bulk-emails`,{
						method: "POST",
						body: formData,
					}).then((res)=>{
						if(res.ok){
							alert("Emails sent succcessfully")
						} else {
							alert("Sending emails failed")
						}
					})
					setSelected([])
					setSubject('')
					setMessage('')
					setFiles([])
					navigate('/Contacts')
				} catch(err) {
					alert(err);
				}

			}
		
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
								
								<form onSubmit={handleSubmit}>
								<div className ="table-responsive-md" style={{ maxHeight: "300px", overflowY: "auto" }}>  
									<table className="table table-striped table-hover">
										<thead style={{ position: "sticky", top: "0" }}>
										<tr>
											<th scope="col">  
											<Checkbox name="All" 
											value={selected.length === contacts.length} 
											updateValue={selectAll}/>Select All
											</th>
											<th scope="col">First Name</th>
											<th scope="col">Last Name</th>
											<th scope="col">Email</th>
											<th scope="col">Phone</th>
											<th colSpan={2} style={{textAlign: "center"}}>
												<button type="submit" onClick={()=>{navigate('/AddNewContact')}} className="btn btn-primary" style={{width: 100, height: 35}}>Add New</button>
											</th>
										</tr>
										</thead>
										<tbody className="table-group-divider">
												{contacts.map((contact, index)=>{return(
																						<tr key={index}>
																							<td>
																							<Checkbox name={contact.email} 
																							value={selected.includes(contact.email)} 
																							updateValue={handleSelect}>{contact.email}
																							</Checkbox>
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
																name="to"
																value={selected}
																placeholder="Selected emails will be displayed here "
																id="to"
																style={{ height: "150px", borderColor: formError.to_status !== "error" ?"":"red" }}
																readOnly
														></textarea>
												</div>
												<p className="error-message">{formError.to}</p>


												<div className="form-group">
														<label className="form-label">Subject</label>
														<input 
														type="text"  
														className="form-control mb-3" 
														id="subject" 
														placeholder="Enter Subject"
														name="subject"
														value={subject}
														onChange={(e) => setSubject(e.target.value)}  
														style={{borderColor: formError.subject_status !== "error" ?"":"red"}}
														/>
												</div>
												<p className="error-message">{formError.subject}</p>


												<div className="form-group">
														<div className="mb-3">
															<label htmlFor="address" className="form-label">Message</label>
															<textarea 
															className="form-control" 
															id="message" 
															placeholder="Type your message"
															name="message"
															rows="5"
															value={message}
															onChange={(e) => setMessage(e.target.value)}  
															style={{borderColor: formError.message_status !== "error" ?"":"red"}}
															></textarea>
														</div>
												</div>
												<p className="error-message">{formError.message}</p>


												<div className="form-group">
													<label htmlFor='uploadImage' className="form-label">Attachments
														<div style={{cursor: 'pointer', width: 50}}>
															<input type='file' 
															name="files" 
															multiple accept="image/*, .pdf, .xslx, .txt" 
															id='uploadImage' 
															onChange={(e) => setFiles([...e.target.files])}/>
															<PiUploadSimpleBold/>
														</div>
													</label>
												</div>


												<div align="center">
													<input className="btn btn-primary mt-5" type="submit" value="Send Emails" /> 
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

