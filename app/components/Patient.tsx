import { Dispatch, MouseEvent, SetStateAction } from 'react'
import type { PatientType } from '~/routes/index'

type PatientPropsProps = {
  patient: PatientType
  setPatient: Dispatch<SetStateAction<PatientType>>
  handleDelete: (id?: string) => void
}

const Patient = ({ patient, setPatient, handleDelete }: PatientPropsProps) => {
  const { name, owner, date, symptoms, email, id } = patient

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {name}</p>

      <p className="font-bold mb-3 text-gray-700 uppercase">
        Propietario: {owner}
      </p>

      <p className="font-bold mb-3 text-gray-700 uppercase">Email: {email}</p>

      <p className="font-bold mb-3 text-gray-700 uppercase">
        Fecha Alta: {date}
      </p>

      <p className="font-bold mb-3 text-gray-700 uppercase">
        Síntomas: {symptoms}
      </p>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          onClick={() => setPatient(patient)}
        >
          Editar
        </button>

        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={() => handleDelete(id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Patient
