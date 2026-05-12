import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import Loader from "./components/Loader";
import useDebounce from "./hooks/useDebounce";

export default function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Debounced search value
  const debouncedSearch = useDebounce(search, 1000);

  // Fetch users only once when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Case-insensitive filtering
      useEffect(() => {
      console.log("Debounced Value:", debouncedSearch);
    }, [debouncedSearch]);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="container">
      <h1>User Search Application</h1>

      <SearchBar search={search} setSearch={setSearch} />

      {loading ? (
        <Loader />
      ) : (
        <UserList users={filteredUsers} />
      )}
    </div>
  );
}