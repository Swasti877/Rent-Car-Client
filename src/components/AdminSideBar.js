import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AdminSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(-1);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin/car") {
      setActiveTab(0);
    } else if (path === "/admin/location") {
      setActiveTab(1);
    } else if (path === "/admin/rental") {
      setActiveTab(2);
    } else {
      setActiveTab(-1);
    }
  }, [location]);

  return (
    <>
      <div className={activeTab === 0 ? "active" : ""}>
        <h2
          onClick={() => {
            navigate("/admin/car");
          }}
        >
          Car
        </h2>
      </div>
      <div
        className={activeTab === 1 ? "active" : ""}
        onClick={() => {
          navigate("/admin/location");
        }}
      >
        <h2>Location</h2>
      </div>
      <div
        className={activeTab === 2 ? "active" : ""}
        onClick={() => {
          navigate("/admin/rental");
        }}
      >
        <h2>Rental</h2>
      </div>
    </>
  );
}
