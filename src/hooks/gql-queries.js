import gql from "graphql-tag";

export const GET_TOP_HIGH_SCORES = gql`
  query getHighScores {
    users(order_by: { score: desc }) {
        id
      name
      score
    }
  }
`;

export const ADD_INITIALS_AND_SCORE = gql`
        mutation($name: String!, $score: Int!) {
        insert_users(objects: { name: $name, score: $score }) {
            returning {
            id
            name
            score
            }
        }
    }
       `;
