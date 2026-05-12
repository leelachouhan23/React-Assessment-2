import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import Loader from "./components/Loader";

function SearchApp() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        const data = await response.json();

        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);

      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {

      const filtered = users.filter((user) =>
        user.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

      setFilteredUsers(filtered);

    }, 500);

    return () => clearTimeout(timer);

  }, [search, users]);

  return (
    <div className="container">

      <h1>User Search App</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {loading ? (
        <Loader />
      ) : (
        <UserList users={filteredUsers} />
      )}

    </div>
  );
}

export default SearchApp;