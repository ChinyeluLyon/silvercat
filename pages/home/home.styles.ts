import styled from "styled-components";

export const Amount = styled.h1`
  color: ${(p) => (p.amount > 0 ? "#1fe61f;" : "#ff3737;")};
  font-weight: bold;
`;
