import { gql } from '@apollo/client';

export default gql`
  mutation signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;
