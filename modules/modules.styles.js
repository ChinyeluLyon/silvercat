import styled from "styled-components";

export const TransactionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
  padding: 25px;
  box-shadow: 1px 5px 10px #c8c8c8;
  border-radius: 10px;
`;

export const Amount = styled.p`
  color: ${(p) => (p.amount > 0 ? "#1fe61f;" : "#ff3737;")};
  font-weight: bold;
`;
