import React from "react";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import personService from "../services/personService";

function Contact({ people, setEditPerson, setPersons, persons, setLoading }) {
  const { name, address, number, photoInfo } = people;

  const editPerson = (person) => {
    setEditPerson(person);
  };

  const deletePerson = (id) => {
    setLoading(true);
    personService
      .deletePerson(id)
      .then((_response) => {
        setPersons(persons.filter((people) => people.id !== id));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  return (
    <div className="flex flex-row items-center justify-center gap-8 laptop:gap-4 ">
      <div>
        <img
          className="w-[12] h-[12] rounded-full border-solid border-2 border-black"
          src={photoInfo.url}
          alt="image description"
        />
      </div>
      <div className="mobile: text-justify ">
        <p className="mobile: font-semibold tablet:font-bold text-lg">{name}</p>
        <p className="">{number}</p>
        <p className="">{address}</p>
      </div>
      <div className="flex flex-col gap-4">
        <FaUserEdit
          className="hover: cursor-pointer"
          onClick={() => editPerson(people)}
        />
        <FaTrashAlt
          className="hover: cursor-pointer"
          onClick={() => deletePerson(people.id)}
        />
      </div>
    </div>
  );
}

export default Contact;
