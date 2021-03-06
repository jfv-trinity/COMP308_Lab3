import './App.css';
//
import React from 'react';
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
//
import './App.css';
//
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import DeleteStudent from './components/StudentList';

import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';
import DeleteCourse from './components/DeleteCourse';

import Home from './components/Home';

//
function App() {

  return (
    <Router>
      
      <div>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>Home</Link>
        <Link to="/studentlist" style={{ padding: 5 }}>Student List</Link>
        <Link to="/addstudent" style={{ padding: 5 }}>Add Student</Link>
        <Link to="/editstudent" style={{ padding: 5 }}>Edit Student</Link>
        <Link to="/courselist" style={{ padding: 5 }}>Course List</Link>
        <Link to="/addcourse" style={{ padding: 5 }}>Add Course</Link>
        <Link to="/editcourse" style={{ padding: 5 }}>Edit Course</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/editstudent" element={<EditStudent />} />
        <Route path="/studentlist" element={<DeleteStudent />} />
        <Route path="/courselist" element={<CourseList />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/editcourse" element={<EditCourse />} />
        <Route path="/deletecourse" element={<DeleteCourse />} />

      </Routes>
    </div>
      
      

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
