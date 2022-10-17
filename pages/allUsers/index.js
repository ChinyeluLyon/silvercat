import React from "react";
import useGetUsers from "../../hooks/UseGetUsers";
import * as S from "./allUsers.styles";
import * as MS from "../../modules/modules.styles";
import { formatCurrency } from "..";

const AllUsers = () => {
  const { data: usersData } = useGetUsers();

  const users = usersData?.map((u, idx) => {
    return (
      <S.AllUsersWrapper key={idx}>
        <div>{u.name}</div>
        <div>
          <MS.Amount amount={u.balance}>
            {u.balance < 0 && "-"}€{formatCurrency(Math.abs(u.balance))}
          </MS.Amount>
        </div>
      </S.AllUsersWrapper>
    );
  });

  return <>{users}</>;
};

export default AllUsers;
