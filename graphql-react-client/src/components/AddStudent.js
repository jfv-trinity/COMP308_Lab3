import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';
//
import './addstyle.css';
//import './display.css';
//
const ADD_STUDENT = gql`
    mutation AddStudent(
        $password: String!,
        $firstName: String!,
        $lastName: String!,
        $address: String!,
        $number: String!,
        $email: String!,
        $program: String!,
        $startingYear: Int!        
        
        ) {
        addStudent(
            password: $password,
            firstName: $firstName,
            lastName: $lastName,
            address: $address,
            number: $number,
            email: $email,
            program: $program,
            startingYear: $startingYear
            
            ) {
            _id
        }
    }
`;

const AddStudent = () => {

    let password, firstName, lastName, address, email, program, startingYear ;
    const [addStudent, { data, loading, error }] = useMutation(ADD_STUDENT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    addStudent({ variables: { 
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
                    placeholder="Enter password:" />
                </div>
                <div class="container">
                    <label>
                        <b>First Name:</b>
                    </label>
                    <input type="text" class="fields" name="firstName" ref={node => {firstName = node; }} 
                    placeholder="First Name:" />
                </div>
                <div class="container">
                    <label>
                        <b>Last Name:</b>
                    </label>
                    <input type="text" class="fields" name="lastName" ref={node => {lastName = node; }}
                    placeholder="Last Name:" />
                </div>
                <div class="container">
                    <label>
                        <b>Address:</b>
                    </label>
                    <input type="text" class="fields" name="address" ref={node => {address = node; }}
                    placeholder="Address:" />
                </div>
                <div class="container">
                    <label>
                        <b>Email:</b>
                    </label>
                    <input type="text" class="fields" name="email" ref={node => {email = node; }}
                    placeholder="Email:" />
                </div>
                
                <div class="container">
                    <label>
                        <b>Program:</b>
                    </label>
                    <input type="text" class="fields" name="program" ref={node => {program = node; }}
                    placeholder="Program:" />
                </div>

                <div class="container">
                    <label>
                        <b>Starting Year:</b>
                    </label>
                    <input type="text" class="fields" name="startingYear" ref={node => {startingYear = node; }}
                    placeholder="Starting Year:" />
                </div>

                <div class="container">
                    <button type="submit" class="fields">Add Student</button>

                </div>
                </div>
            </form>
        </div>
    );
}

export default AddStudent
