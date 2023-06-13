import Swal from "sweetalert2";

export const notify = (title, text, icon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "Close",
  });
};
