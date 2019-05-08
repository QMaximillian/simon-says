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
