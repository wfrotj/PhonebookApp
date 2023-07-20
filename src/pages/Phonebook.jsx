import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import LoadingContext from "../features/LoadingContext";
import PersonList from "../components/PersonList";
import PersonForm from "../components/PersonForm";
import EditPersonForm from "../components/EditPersonForm";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/Phonebook.css";

function Phonebook({ user, setUser }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const [editPerson, setEditPerson] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedPhonebookUser");
    setUser(null);
  };
  function scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-15% via-sky-500 via-1% flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center text-center gap-8 mt-4 text-4xl">
        <div>
          <h1 className="font-semibold">Phonebook</h1>
          <h2 className="m-4 text-2xl ">
            Welcome <span className="font-semibold">{user?.name}</span>! You can
            now add contact and ccess it anytime, anywhere without hassle.
          </h2>
        </div>
      </div>
      <div className="flex gap-2 justify-end  ">
        <h3>Logout</h3>
        <ImExit
          onClick={handleLogout}
          className="text-2xl hover:text-red-600 cursor-pointer "
        />
      </div>
      <div className="laptop:flex laptop:flex-row laptop:gap-4">
        {user && (
          <>
            <PersonForm
              newPhoto={newPhoto}
              setNewPhoto={setNewPhoto}
              setLoading={setLoading}
            />

            {editPerson ? (
              <EditPersonForm
                person={editPerson}
                newPhoto={newPhoto}
                setNewPhoto={setNewPhoto}
                setLoading={setLoading}
                onCancel={() => setEditPerson(null)}
              />
            ) : (
              <div className="laptop:flex laptop:flex-col laptop:items-center">
                <PersonList
                  setLoading={setLoading}
                  setEditPerson={setEditPerson}
                />
                <div className="flex flex-col items-center justify-center">
                  <button onClick={scrollToTop}>Scroll to Top</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Phonebook;
