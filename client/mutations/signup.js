import { gql } from '@apollo/client';

export default gql`
  mutation signup($username: String, $email: String, $password: String) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;
