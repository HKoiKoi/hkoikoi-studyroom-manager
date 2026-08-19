import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const alertUtils = {
  success: (title: string, text?: string) => {
    Swal.fire({
      icon: "success",
      title,
      text,
      confirmButtonColor: "#3085d6",
    });
  },

  error: (title: string, text?: string) => {
    Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonColor: "#d33",
    });
  },

  confirm: async (
    title: string,
    text?: string,
    confirmText: string = "확인",
  ): Promise<boolean> => {
    const result = await Swal.fire({
      icon: "warning",
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: "취소",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      heightAuto: false,
    });

    return result.isConfirmed;
  },

  toastSuccess: (title: string) => {
    Toast.fire({
      icon: "success",
      title,
    });
  },

  toastError: (title: string) => {
    Toast.fire({
      icon: "error",
      title,
    });
  },
};
