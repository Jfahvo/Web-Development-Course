import Person from './Person'

const Persons = ({ personsToShow, deletePerson }) => {
    return (
      <div>
        {personsToShow.map(person => (
          <Person key={person.name} person={person} deletePerson={() => deletePerson(person.id)} />
        ))}
      </div>
    )
  }

export default Persons