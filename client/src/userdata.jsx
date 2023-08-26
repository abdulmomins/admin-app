const UserData = ({ users }) => {
  return (
    <>
      {users.map((curUser) => {
        const { id, name } = curUser;
        return (
          <tr>
            <td>{id}</td>
            <td>{name}</td>
          </tr>
        );
      })}
    </>
  );
};
export default UserData;
