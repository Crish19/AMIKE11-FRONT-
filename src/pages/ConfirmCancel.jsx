import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmCancel() {
  const api = "https://obscure-sierra-26039-89103941a3f4.herokuapp.com";
  const id = window.location.pathname.split("/");
  const navigate = useNavigate();
  console.log(id[4]);
  useEffect(() => {
    const Cancel = async () => {
      try {
        const res = await axios.post(api + "/api/bookings/cancel/" + id[4]);
        const json = await res.data;
        if (res.ok) {
          navigate("/booking-cancelled-confirmation");
        }
      } catch (err) {
        console.log(err);
      }
    };
    Cancel();
  }, []);
  return <div>Cargando...</div>;
}

export default ConfirmCancel;
