import {gql, useQuery, useMutation } from "@apollo/client";
import React, { Component }  from 'react';
import './sample.css';
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

const DELETE_STUDENT = gql`
mutation DeleteStudent(
    $_id:String!){
      deleteStudent(id:$_id){
        _id
      }
    }  
`;

const DeleteStudent = ({ id }) => {
    const { data } =  useQuery(GET_STUDENTS, { variables: { id }});
    const [deleteStudent] = useMutation(DELETE_STUDENT);
  
    const handleOnClick = ()=> {
        deleteStudent({ variables: {id }});
    }

    if (data && data.student) {
        const { student: {id, firstName, lastName, program, email }} = data;

        if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return<div>
            
            <table >
                <tr>
                        <th>_id</th>
                        <th>email</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>program</th>

                </tr>
                        <tr>
                            <td>{_id}</td>
                            <td>{email}</td>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{program}</td>

                        </tr>
            </table>
            
            <div class="center">
            <button onClick={handleOnClick}>Remove</button>
            </div>
            
        </div>
    }
    return null;
}


export default DeleteStudent