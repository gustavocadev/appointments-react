import { Dispatch, SetStateAction } from 'react'
import type { PatientType } from '~/routes/index'
import Patient from './Patient'

type ListadoPacientesProps = {
  patients: PatientType[]
  setPatient: Dispatch<SetStateAction<PatientType>>
  setPatients: Dispatch<SetStateAction<PatientType[]>>
}

const ListadoPacientes = ({
  patients,
  setPatient,
  setPatients,
}: ListadoPacientesProps) => {
  const handleDelete = (id?: string) => {
    const newPatients = patients.filter((patient) => patient.id !== id)
    setPatients(newPatients)
  }

  return (
    <section className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {patients && patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''}
            <span className="text-indigo-600 font-bold ">
              Pacientes y Citas
            </span>
          </p>
          {patients.map((patient: PatientType) => {
            return (
              <Patient
                patient={patient}
                key={patient.id}
                setPatient={setPatient}
                handleDelete={handleDelete}
              />
            )
          })}
        </>
      ) : (
        <p className="text-center font-black text-3xl">
          No hay pacientes registrados
        </p>
      )}
    </section>
  )
}

export default ListadoPacientes
