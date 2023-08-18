const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer">
        <div className="copyright">
          &copy; Copyright <strong><span>CoderTest</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="/">Chandani Singh</a>
        </div>
      </footer>

      <a href={process.env.REACT_APP_BASE_URL} className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </>
  )
}

export default Footer
