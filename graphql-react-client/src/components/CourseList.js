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
      _id
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

// Change to update course
const UPDATE_COURSE = gql`
mutation UpdateCourse(
    $id: String!
    $code: String!,
    $name: String!,
    $section: Int!,
    $semester: String!,
    $startingYear: Int! ) 
    
    {
    updateCourse(id: $id, code:$code, name:$name,section:$section,
      semester:$semester, startingYear:$startingYear) {
        _id
        code
        name
        section
        semester
        startingYear
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

    const [editCourse] = useMutation(UPDATE_COURSE);
    const handleOnClickEdit = (_id)=> {
        editCourse({ variables: { _id}});
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            <table cellPadding={5}>
                <tbody>
                <tr>
                    <th>id</th>
                    <th>code</th>
                    <th>name</th>
                    <th>section</th>
                    <th>semester</th>
                    <th>startingYear</th>
                </tr>
                </tbody>
                {data.courses.map((course, index) => (
                    <tbody>
                        <tr key={index}>
                            <td>{course._id}</td>
                            <td>{course.code}</td>
                            <td>{course.name}</td>
                            <td>{course.section}</td>
                            <td>{course.semester}</td>
                            <td>{course.startingYear}</td>
                            <td>
                                <button onClick={handleOnClickDelete(course._id)}>Remove</button>
                            </td>
                            <td>
                                <button className='center'>Edit</button>
                            </td>
                        </tr>
                    </tbody>
                ))}

            </table>
            
            <div className="center">
                <button className="center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default CourseList

