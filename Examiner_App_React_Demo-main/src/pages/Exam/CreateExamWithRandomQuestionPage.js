import React from 'react'
import {CreateExamWithRandomQuestion, Footer, Header, Sidebar} from '../../components'

const CreateExamWithRandomQuestionPage = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
      <CreateExamWithRandomQuestion/>
    <Footer/>
    </>
  )
}

export default CreateExamWithRandomQuestionPage
