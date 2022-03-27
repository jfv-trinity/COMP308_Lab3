import React from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import './sample.css';
import './addstyle.css'

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

function EditCourse(props)
{
    let code, name, section, semester, startingYear ;
    const { loading, data } = useQuery(GET_COURSES);
    const [editCourse, {error}] = useMutation(UPDATE_COURSE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    editCourse({ variables: { 
                        code: code.value,
                        name: name.value,
                        section: parseInt(section.value), 
                        semester: semester.value,
                        startingYear: parseInt(startingYear.value) 
                      } });
                      
                    code.value = '';
                    name.value = '';
                    section.value = '';
                    semester.value = '';
                    startingYear.value='';

                }}
            >
                <div class="outer_container">
                <div class="container">
                    <label>
                        <b>code:</b>
                    </label>
                    <input type="text" class="fields" name="code" ref={node => {code = node; }} 
                    placeholder="code" defaultValue={data.code}/>
                </div>
                <div class="container">
                    <label>
                        <b>Course name:</b>
                    </label>
                    <input type="text" class="fields" name="name" ref={node => {name = node; }} 
                    placeholder="course name" defaultValue={data.name}/>
                </div>
                <div class="container">
                    <label>
                        <b>Course section:</b>
                    </label>
                    <input type="text" class="fields" name="section" ref={node => {section = node; }}
                    placeholder="Course Section" defaultValue={data.section}/>
                </div>
                <div class="container">
                    <label>
                        <b>semester:</b>
                    </label>
                    <input type="text" class="fields" name="semester" ref={node => {semester = node; }}
                    placeholder="semester" defaultValue={data.semester}/>
                </div>
                <div class="container">
                    <label>
                        <b>Starting Year:</b>
                    </label>
                    <input type="text" class="fields" name="startingYear" ref={node => {startingYear = node; }}
                    placeholder="Starting Year" defaultValue={data.startingYear}/>
                </div>
                <div class="container">
                    <button type="submit" class="fields">Update Course</button>

                </div>
                </div>
            </form>
        </div>
    );

}

export default EditCourse;