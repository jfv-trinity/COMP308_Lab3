import React from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import './sample.css';
import './addstyle.css'
//
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
const GET_COURSES = gql`
{
    courses{
      code
      name
      section
      semester
      startingYear
      
    }
}
`;

// Delete Course
const DELETE_COURSE = gql`
mutation DeleteCourse(
    $_id:String!){
        deleteCourse(id:$_id){
        _id
      }
    }  
`;

//
const CourseList = () => {

    const { loading, error, data , refetch } = useQuery(GET_COURSES);

    const [deleteCourse] = useMutation(DELETE_COURSE);
    const handleOnClickDelete = (_id)=> {
        deleteCourse({ variables: { _id}});
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <table >
                <tr>
                        <th>code</th>
                        <th>name</th>
                        <th>section</th>
                        <th>semester</th>
                        <th>startingYear</th>

                </tr>
                {data.courses.map((course, index) => (
                        <tr key={index}>
                            <td>{course._id}</td>
                            <td>{course.email}</td>
                            <td>{course.firstName}</td>
                            <td>{course.lastName}</td>
                            <td>{course.program}</td>
                            <td>
                                <button class = "center" onClick={handleOnClickDelete(course._id)}>Remove</button>
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

export default CourseList

