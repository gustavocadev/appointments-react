import { Dispatch, FormEvent, SetStateAction, useState, useEffect } from 'react'
import Error from './Error'
import { PatientType } from '~/routes/index'
import { v4 as uuidv4 } from 'uuid'

type FormProps = {
  patient: PatientType
  setPatients: Dispatch<SetStateAction<PatientType[]>>
  patients: PatientType[]
  setPatient: Dispatch<SetStateAction<PatientType>>
}

const Form = ({ setPatients, patient, patients, setPatient }: FormProps) => {
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [symptoms, setSymptoms] = useState('')

  const [error, setError] = useState(false)

  const [editPatient, setEditPatient] = useState(false)

  useEffect(() => {
    for (let value of Object.values(patient)) {
      if (value !== '') {
        // console.log('Si hay algo')
        setName(patient.name)
        setOwner(patient.owner)
        setEmail(patient.email)
        setDate(patient.date)
        setSymptoms(patient.symptoms)
        setEditPatient(true)
        return
      }
    }
    console.log('No hay nada')
  }, [patient])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ([name, owner, email, date, symptoms].includes('')) {
      console.log('hay un campo vacio')
      setError(true)
      return
    }
    setError(false)

    const newPatient: PatientType = {
      name,
      owner,
      email,
      date,
      symptoms,
    }
    //  editPatient state is true so:
    if (editPatient) {
      // editing the info my patient
      newPatient.id = uuidv4() // create a new id :)
      console.log('button guardar editado')
      // itero por toda la lista de pacientes, hago una codiciona, si los dos id,
      // que esta siendo editado y el que ya existe son iguales, quiero que me actualices por el nuevo id y lo demás dejalo igual
      const patientsUpdated = patients.map((patientState) =>
        patientState.id === patient.id ? newPatient : patientState,
      )
      setPatients(patientsUpdated)
      setPatient({
        name: '',
        owner: '',
        email: '',
        date: '',
        symptoms: '',
        id: '',
      })
      setEditPatient(false)
    } else {
      // My new Patient
      newPatient.id = uuidv4()
      setPatients((previousPatients) => [...previousPatients, newPatient])
    }
    // Clearing inputs :)
    setDate('')
    setName('')
    setOwner('')
    setEmail('')
    setSymptoms('')
  }

  return (
    <div className="w-full md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade paciente{' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded py-10 px-8"
      >
        {error && <Error>Todos los campos son obligatorios</Error>}
        <label htmlFor="pet" className="mb-5 block">
          <span className="block text-gray-200 font-bold  uppercase text-gray-700">
            Nombre de la mascota
          </span>
          <input
            type="text"
            placeholder="Nombre de la mascota"
            className="placeholder-gray-400 rounded-md p-2 w-full border-2"
            id="pet"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="" className="mb-5 block">
          <span className="block text-gray-200 font-bold  uppercase text-gray-700">
            Nombre propietario
          </span>
          <input
            type="text"
            placeholder="Nombre de propietario"
            className="placeholder-gray-400 rounded-md p-2 w-full border-2"
            id="pet"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </label>
        <label htmlFor="email" className="mb-5 block">
          <span className="block text-gray-200 font-bold  uppercase text-gray-700">
            Email
          </span>
          <input
            type="email"
            placeholder="Email contacto propietario"
            className="placeholder-gray-400 rounded-md p-2 w-full border-2"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="date" className="mb-5 block">
          <span className="block text-gray-200 font-bold  uppercase text-gray-700">
            Fecha
          </span>
          <input
            type="date"
            className="placeholder-gray-400 rounded-md p-2 w-full border-2"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label htmlFor="date" className="mb-5 block">
          <span className="block text-gray-200 font-bold  uppercase text-gray-700">
            Sintomaas
          </span>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="escribe los sintomas"
            className="placeholder-gray-400 rounded-md p-2 w-full border-2"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="mb-5 block bg-indigo-600 p-3 text-white uppercase font-bold w-full cursor-pointer hover:bg-indigo-700 rounded transition-colors duration-200"
        >
          {editPatient ? 'Editar paciente' : 'Añadir paciente'}
        </button>
      </form>
    </div>
  )
}

export default Form
