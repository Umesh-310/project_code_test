import { Link } from 'react-router-dom'

const PageTitle = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Add New Question</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/account/dashboard">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/question/all_question">All Questions</Link></li>
            <li className="breadcrumb-item"><Link to="/question/my_question">My Questions</Link></li>
            <li className="breadcrumb-item active"><Link to="/question/add_question">Add New Question</Link></li>
          </ol>
        </nav>
      </div>
    </>
  )
}

export default PageTitle
