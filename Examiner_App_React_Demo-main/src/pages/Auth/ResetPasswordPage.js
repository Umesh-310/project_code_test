import React from 'react'
import {Header, ResetPasswordSide} from '../../components'
import AuthTheme from '../../utils/AuthTheme'

const ResetPasswordPage = () => {
  return (
    <>
    <AuthTheme>
      <Header/>
      <ResetPasswordSide />
    </AuthTheme>
    </>
  )
}

export default ResetPasswordPage
