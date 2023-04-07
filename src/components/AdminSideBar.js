import { useNavigate } from "react-router-dom";

export default function AdminSideBar() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h2
          onClick={() => {
            navigate("/admin/car");
          }}
        >
          Car
        </h2>
      </div>
      <div
        onClick={() => {
          navigate("/admin/location");
        }}
      >
        <h2>Location</h2>
      </div>
      <div
        onClick={() => {
          navigate("/admin/rental");
        }}
      >
        <h2>Rental</h2>
      </div>
    </>
  );
}
