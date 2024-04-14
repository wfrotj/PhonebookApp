import { useState, useRef, useEffect, useContext } from "react";
import PersonContext from "../features/PersonContext";
import personService from "../services/personService";

function PersonForm({ setLoading, newPhoto, setNewPhoto }) {
  const { persons, setPersons } = useContext(PersonContext);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [newAge, setNewAge] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    fileInputRef.current.value = null;
  }, [fileInputRef]);

  const addPerson = (e) => {
    e.preventDefault();

    setLoading(true);

    const formattedBirthday = new Date(newBirthday).toISOString().split("T")[0];

    const newPersonData = new FormData();
    newPersonData.append("image", newPhoto);
    newPersonData.append("name", newPerson);
    newPersonData.append("number", newNumber);
    newPersonData.append("address", newAddress);
    newPersonData.append("birthday", formattedBirthday);
    newPersonData.append("age", newAge);
    personService
      .createPerson(newPersonData)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPhoto("");
        setNewPerson("");
        setNewNumber("");
        setNewAddress("");
        setNewBirthday("");
        setNewAge("");
      })
      .catch((error) => alert(error.response.data.error))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <form
        onSubmit={addPerson}
        className="bg-white flex flex-col gap-2 p-2 border-solid border-2 border-black md:max-w-xl md:mx-auto"
      >
        <div className="flex flex-col">
          <label>Upload contact photo</label>
          <input
            className="border-solid border-2 border-slate-500 p-2"
            type="file"
            required
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setNewPhoto(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col">
          <label>Name</label>
          <input
            className="border-solid border-2 border-slate-500 p-2"
            type="text"
            required
            minLength={5}
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            className="border-solid border-2 border-slate-500 p-2"
            type="text"
            required
            minLength={11}
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Address</label>
          <input
            className="border-solid border-2 border-slate-500 p-2"
            type="text"
            required
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Birthday</label>
          <input
            className="border-solid border-2 border-slate-500 p-2"
            type="date"
            required
            value={newBirthday}
            onChange={(e) => setNewBirthday(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Age</label>
          <input
            className="border-solid border-2 border-slate-500 p-2"
            type="text"
            required
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
          />
        </div>
        <button
          className="bg-black rounded-xl py-2 text-white font-bold"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default PersonForm;
