var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var StudentModel = require('../models/Student');
var CourseModel = require('../models/Course');
//
// Create a GraphQL Object Type for Student model
const studentType = new GraphQLObjectType({
    name: 'student',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        firstName: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        Address: {
          type: GraphQLString
        },
        number: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        program: {
          type: GraphQLString
        },
        startingYear: {
          type: GraphQLInt
        }
        
        
      }
    }
});
  const courseType = new GraphQLObjectType({
    name: 'course',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        code: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        },
        section: {
          type: GraphQLInt
        },
        semester: {
          type: GraphQLString
        },
        startingYear: {
          type: GraphQLInt
        }
      }
    }
  });
  //
  // create a GraphQL query type that returns all students or a student by id
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        students: {
          type: new GraphQLList(studentType),
          resolve: function () {
            const students = StudentModel.find().exec()
            if (!students) {
              throw new Error('Error')
            }
            return students
          }
        },
        student: {
          type: studentType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const studentInfo = StudentModel.findById(params.id).exec()
            if (!studentInfo) {
              throw new Error('Error')
            }
            return studentInfo
          }
        },
        courses: {
          type: new GraphQLList(courseType),
          resolve: function () {
            const courses = CourseModel.find().exec()
            if (!courses) {
              throw new Error('Error')
            }
            return courses
          }
        },
        course: {
          type: courseType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const courseInfo = CourseModel.findById(params.id).exec()
            if (!courseInfo) {
              throw new Error('Error')
            }
            return courseInfo
          }
        }
      }
    }
  });
  //
  // add mutations for CRUD operations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addStudent: {
        type: studentType,
        args: {
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          address: {
            type: new GraphQLNonNull(GraphQLString)
          },
          number: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          program: {
            type: new GraphQLNonNull(GraphQLString)
          },
          startingYear: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: function (root, params) {
          const studentModel = new StudentModel(params);
          const newStudent = studentModel.save();
          if (!newStudent) {
            throw new Error('Error');
          }
          return newStudent
        }
      },
      updateStudent: {
        type: studentType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          address: {
            type: new GraphQLNonNull(GraphQLString)
          },
          number: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          program: {
            type: new GraphQLNonNull(GraphQLString)
          },
          startingYear: {
            type: new GraphQLNonNull(GraphQLInt)
          }
            
        },
        resolve(root, params) {
          return StudentModel.findByIdAndUpdate(params.id,
            {
              password: params.password,
              firstName: params.firstName,
              lastName: params.lastName,
              address: params.address,
              number: params.number,
              email: params.email,
              program: params.program,
              startingYear: params.startingYear
            }, function (err) {
              if (err) return next(err);
            });
        }
      },
      deleteStudent: {
        type: studentType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const deletedStudent = StudentModel.findByIdAndRemove(params.id).exec();
          if (!deletedStudent) {
            throw new Error('Error')
          }
          return deletedStudent;
        }
      },
      addCourse: {
        type: courseType,
        args: {
          code: {
            type: new GraphQLNonNull(GraphQLString)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          section: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          semester: {
            type: new GraphQLNonNull(GraphQLString)
          },
          startingYear: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: function (root, params) {
          const courseModel = new CourseModel(params);
          const newCourse = courseModel.save();
          if (!newCourse) {
            throw new Error('Error');
          }
          return newCourse
        }
      },
      updateCourse: {
        type: courseType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          code: {
            type: new GraphQLNonNull(GraphQLString)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          section: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          semester: {
            type: new GraphQLNonNull(GraphQLString)
          },
          startingYear: {
            type: new GraphQLNonNull(GraphQLInt)
          }
            
        },
        resolve(root, params) {
          return CourseModel.findByIdAndUpdate(params.id,
            {
              code: params.code,
              name: params.name,
              section: params.section,
              semester: params.semester,
              startingYear: params.startingYear
            }, function (err) {
              if (err) return next(err);
            });
        }
      },
      deleteCourse: {
        type: courseType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const course = CourseModel.findByIdAndRemove(params.id).exec();
          if (!course) {
            throw new Error('Error')
          }
          return course;
        }
      },
      loginStudent: {
        type: studentType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }

        },
        resolve: async ({ root, params }) => {
          console.log(params.id);
          let student = await StudentModel.findOne(params.id).exec();
          console.log(student)
          console.log(student._id);
          console.log(student.password);
            if (!student) {
              throw new Error('Invalid Credentials!user')
            }
            if (!params.password == student.password) {
              throw new Error("Invalid Credentials!password")
            };
            loggedIn = true;
           
            return {
              loggedIn
            }
        }
      }
    }
  }
});
  
  //
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
  