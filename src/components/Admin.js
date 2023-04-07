import "./Admin.css";
import AdminSideBar from "./AdminSideBar";

export default function Admin({ components, modal }) {
  return (
    <div className="admin">
      {modal}
      <div className="adminSideBar">
        <AdminSideBar />
      </div>

      <div className="adminBody">{components}</div>
    </div>
  );
}
