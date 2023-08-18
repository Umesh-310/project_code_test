import React from 'react'
import {CreateExamWithSelectedQuestion, Footer, Header, Sidebar} from '../../components'

const CreateExamWithSelectedQuestionPage = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
      <CreateExamWithSelectedQuestion/>
    <Footer/>
    </>
  )
}

export default CreateExamWithSelectedQuestionPage
