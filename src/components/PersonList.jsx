import { useEffect, useContext } from "react";

import PersonContext from "../features/PersonContext";
import personService from "../services/personService";
import Contact from "./Contact";

function PersonList({ setLoading, setEditPerson }) {
  const { persons, setPersons } = useContext(PersonContext);

  useEffect(() => {
    personService
      .getPersons()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mt-4 laptop:grid laptop:grid-cols-3 tablet:grid tablet:grid-cols-2">
      {persons.map((people, index) => (
        <Contact
          key={index}
          people={people}
          setEditPerson={setEditPerson}
          setPersons={setPersons}
          setLoading={setLoading}
          persons={persons}
        />
      ))}
    </div>
  );
}

export default PersonList;
