import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';
//
import './addstyle.css';
//import './display.css';
//
const ADD_COURSE = gql`
    mutation AddCourse(
        $code: String!,
        $name: String!,
        $section: Int!,
        $semester: String!,
        $startingYear: Int!        
        
        ) {
        addCourse(
            code: $code,
            name: $name,
            section: $section,
            semester: $semester,
            startingYear: $startingYear
            
            ) {
            _id
        }
    }
`;

const AddCourse = () => {

    let code, name, section, semester, startingYear ;
    const [addCourse, { data, loading, error }] = useMutation(ADD_COURSE);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    addCourse({ variables: { 
                        code: code.value,
                        name: name.value,
                        section: section.value, 
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
                    placeholder="Enter course code:" />
                </div>
                <div class="container">
                    <label>
                        <b>Course name:</b>
                    </label>
                    <input type="text" class="fields" name="name" ref={node => {name = node; }} 
                    placeholder="Enter course name:" />
                </div>
                <div class="container">
                    <label>
                        <b>Course section:</b>
                    </label>
                    <input type="text" class="fields" name="section" ref={node => {section = node; }}
                    placeholder="Enter course Section:" />
                </div>
                <div class="container">
                    <label>
                        <b>semester:</b>
                    </label>
                    <input type="text" class="fields" name="semester" ref={node => {semester = node; }}
                    placeholder="semester:" />
                </div>
                <div class="container">
                    <label>
                        <b>Starting Year:</b>
                    </label>
                    <input type="text" class="fields" name="startingYear" ref={node => {startingYear = node; }}
                    placeholder="Starting Year:" />
                </div>
                <div class="container">
                    <button type="submit" class="fields">Add Course</button>

                </div>
                </div>
            </form>
        </div>
    );
}

export default AddCourse
