import React from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import { Link } from 'react-router-dom'
import './sample.css';
import './addstyle.css'


//
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
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

// Delete Student
const DELETE_STUDENT = gql`
mutation DeleteStudent(
    $_id:String!){
      deleteStudent(id:$_id){
        _id
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
      ... studentFields
    }
  }
  fragment studentFields on student{
    _id
    firstName
    lastName
    password
    Address
    number
    email
    program
    startingYear
  }
`;


//
const StudentList = () => {
    
    const { loading, error, data , refetch } = useQuery(GET_STUDENTS);

    const [deleteStudent] = useMutation(DELETE_STUDENT);
    const handleOnClickDelete = (_id)=> {
        deleteStudent({ variables: { _id}});
    }

    const [editStudent] = useMutation(UPDATE_STUDENT);
    const handleOnClickEdit = (_id)=> {
        editStudent({ variables: { _id}});
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    return(
    
        <div>
            <table cellPadding={5} >
                <tr>
                        <th>_id</th>
                        <th>email</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>program</th>

                </tr>
                {data.students.map((student, index) => (
                        <tr key={index}>
                            <td>{student._id}</td>
                            <td>{student.email}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.program}</td>
                            <td>
                                <button class = "center" onClick={handleOnClickDelete(student._id)}>Remove</button>
                            </td>
                            <td>
                                <button class = "center">Edit</button>
                            </td>
                        </tr>
                ))}
             
            </table>
            <div class="center">
                <button class = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
    );
}

export default StudentList

