import {gql, useQuery, useMutation} from "@apollo/client";
import React, { Component }  from 'react';
import './addstyle.css'

const GET_STUDENTS = gql`
{
    students{
        _id
      email
      firstName
      lastName
      program
      
    }
}
`;

const GET_STUDENTS_ID = gql`
query Student($id:String!){
    students(id:$id){
        _id,
      email
      firstName
      lastName
      program
      
    }
}
`;

// Update Student
const UPDATE_STUDENT = gql`
mutation UpdateStudent(
    $id: String!
    $firstName: String!,
    $lastName: String!,
    $password: String!,
    $address: String!,
    $number: String!,
    $email: String!,
    $program: String!,
    $startingYear: Int! ) 
    
    {
    updateStudent(id: $id, firstName:$firstName, lastName:$lastName,password:$password,
      address:$address,number:$number, email:$email,program: $program, startingYear:$startingYear) {
        _id,
        firstName
        lastName
        password
        Address
        number
        email
        program
        startingYear
    }
  }
`;

function EditStudent(props)
{
    let password, firstName, lastName, address, email, program, startingYear ;
    const { loading, data } = useQuery(GET_STUDENTS);
    const [editStudent, {error}] = useMutation(UPDATE_STUDENT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h2>Edit Students</h2>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    editStudent({ variables: {
                        id:data.id, 
                        password: password.value,
                        firstName: firstName.value,
                        lastName: lastName.value, 
                        address: address.value,
                        email: email.value,
                        program: program.value,
                        startingYear: parseInt(startingYear.value) 
                      } });
                      
                    password.value = '';
                    firstName.value = '';
                    lastName.value = '';
                    address.value = '';
                    email.value='';
                    program.value='';
                    startingYear.value='';

                }}
            >
                <div class="outer_container">
                <div class="container">
                    <label>
                        <b>Password:</b>
                    </label>
                    <input type="text" class="fields" name="password" ref={node => {password = node; }} 
                    placeholder="Password" defaultValue={data.password} />
                </div>
                <div class="container">
                    <label>
                        <b>First Name:</b>
                    </label>
                    <input type="text" class="fields" name="firstName" ref={node => {firstName = node; }} 
                    placeholder="First Name" defaultValue={data.firstName} />
                </div>
                <div class="container">
                    <label>
                        <b>Last Name:</b>
                    </label>
                    <input type="text" class="fields" name="lastName" ref={node => {lastName = node; }}
                    placeholder="Last Name" defaultValue={data.lastName} />
                </div>
                <div class="container">
                    <label>
                        <b>Address:</b>
                    </label>
                    <input type="text" class="fields" name="address" ref={node => {address = node; }}
                    placeholder="Address" defaultValue={data.address} />
                </div>
                <div class="container">
                    <label>
                        <b>Email:</b>
                    </label>
                    <input type="text" class="fields" name="email" ref={node => {email = node; }}
                    placeholder="Email" defaultValue={data.email} />
                </div>
                
                <div class="container">
                    <label>
                        <b>Program:</b>
                    </label>
                    <input type="text" class="fields" name="program" ref={node => {program = node; }}
                    placeholder="Program" defaultValue={data.program} />
                </div>

                <div class="container">
                    <label>
                        <b>Starting Year:</b>
                    </label>
                    <input type="text" class="fields" name="startingYear" ref={node => {startingYear = node; }}
                    placeholder="Starting Year" defaultValue={data.startingYear} />
                </div>

                <div class="container">
                <button type="submit" class="fields">Update Student</button>
                </div>
                </div>
            </form>
        </div>
    );

}

export default EditStudent;