import React from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";

const LOGINSTUDENT = gql`
    mutation LOGINSTUDENT(
        $id: String!,
        $password: String!,
        ) {
        loginStudent(
            id: $id,
            password: $password
            ) {
         _id       
        }
    }
`;

function Home(props)
{
    let id, password;
    const [login, { data, loading, error }] = useMutation(LOGINSTUDENT);
   
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    

        return (
       <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    login({ variables: { 
                        id: id.value,
                        password: password.value,
                      } });
                      
                    id.value = '';
                    password.value = '';
                }}
            >
                <div class="outer_container">
                <div class="container">
                    <label>
                        <b>User Id:</b>
                    </label>
                    <input type="text" class="fields" name="id" ref={node => {id = node; }} 
                    placeholder="Enter Id:" />
                </div>
                <div class="container">
                    <label>
                        <b>Password:</b>
                    </label>
                    <input type="text" class="fields" name="password" ref={node => {password = node; }} 
                    placeholder="Enter password:" />
                </div>
              
                <div class="container">
                    <button type="submit" class="fields">login</button>

                </div>
                </div>
            </form>
        </div>
    );
    }


export default Home;