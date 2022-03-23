var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var CourseModel = require('../models/Course');
//
// Create a GraphQL Object Type for Course model
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
  // create a GraphQL query type that returns all courses or a course by id
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
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
        student: {
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
            const deleteCourse = CourseModel.findByIdAndRemove(params.id).exec();
            if (!deleteCourse) {
              throw new Error('Error')
            }
            return deleteCourse;
          }
        }
      }
    }
  });
  
  //
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
  