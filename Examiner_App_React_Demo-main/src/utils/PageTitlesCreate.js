import { Link } from "react-router-dom";

// css
import css from "./PageTitlesCreate.module.css";

const PageTitlesCreate = (props) => {
  const { title, breadcrumb, showLeftMenuBtn = false, children } = props;

  return (
    <>
      <div className={css.pagetitleFlex}>
        <div className="pagetitle">
          <h1>{title}</h1>
          <nav>
            <ol className="breadcrumb">
              {breadcrumb.length &&
                breadcrumb.map((data, i) => (
                  <li key={i} className="breadcrumb-item">
                    <Link to={data.url}>{data.title}</Link>
                  </li>
                ))}
            </ol>
          </nav>
        </div>
        {showLeftMenuBtn && <div>{children}</div>}
      </div>
    </>
  );
};

export default PageTitlesCreate;
