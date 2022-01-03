import { useState, useEffect } from 'react'
import Form from '~/components/Form'
import ListadoPacientes from '~/components/ListadoPacientes'
export type PatientType = {
  name: string
  owner: string
  email: string
  date: string
  symptoms: string
  id?: string
}
export default function index() {
  const [patients, setPatients] = useState<PatientType[]>([])
  const [patient, setPatient] = useState<PatientType>({
    name: '',
    owner: '',
    email: '',
    date: '',
    symptoms: '',
    id: '',
  })

  useEffect(() => {
    const getInitialPatient =
      JSON.parse(localStorage.getItem('patient') as string) || []

    setPatients(getInitialPatient)
  }, [])

  useEffect(() => {
    localStorage.setItem('patient', JSON.stringify(patients))
  }, [patients])
  return (
    <main className="container mx-auto mt-20">
      <section className="mt-12 block md:flex">
        <Form
          setPatients={setPatients}
          patient={patient}
          patients={patients}
          setPatient={setPatient}
        />

        <ListadoPacientes
          patients={patients}
          setPatient={setPatient}
          setPatients={setPatients}
        />
      </section>
    </main>
  )
}
