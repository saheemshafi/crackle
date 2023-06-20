import { ToastOptions } from "react-hot-toast";
import { BiCheck } from "react-icons/bi";

export const toastOptions: ToastOptions = {
  icon: <BiCheck size={20} />,
  style: {
    background: "#181a1d",
    color: "white",
    fontWeight: 400,
  },
};
