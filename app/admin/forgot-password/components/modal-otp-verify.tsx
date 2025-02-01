import React from "react";
import { useForgotPassword, useOtpVerification } from "../../admin.service";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { IPayloadOtpVerification } from "@/app/api/auth/otp-verification/otp-verification.interface";

const ModalOtpVerify: React.FC = () => {
  const navigate = useRouter();
  const [counter, setCounter] = React.useState(60);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const { mutate: resendOtp } = useForgotPassword({
    onSuccess: () => {
      setCounter(0);
      toast.success("Resend OTP send to" + email);
    },
  });

  const { mutate: otpVerify, isPending } = useOtpVerification({
    onSuccess: (data) => {
      const modal = document.getElementById(
        `my_modal_otp_verify`
      ) as HTMLDialogElement;
      modal?.close();
      navigate.push("/admin/reset-password?token=" + data.accessToken);
    },
  });

  const handleResendOtp = () => {
    if (email && counter === 0) {
      setCounter(60);
      resendOtp({ email });
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = useFormik<IPayloadOtpVerification>({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (value) => {
      otpVerify(value);
    },
  });

  React.useEffect(() => {
    if (email) {
      setFieldValue("email", email);
    }
  }, [email, setFieldValue]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <dialog id={`my_modal_otp_verify`} className="modal">
      <form
        onSubmit={handleSubmit}
        className="modal-box max-w-lg bg-background"
      >
        <h5 className="font-bold">Verify OTP</h5>
        <hr className="my-2" />
        <p className="py-4 text-sm">Please input your OTP</p>
        <div className="flex gap-4 h-full">
          <input
            name="otp"
            onChange={(e) => {
              if (e.target.value.length > 4) {
                e.target.value = e.target.value.slice(0, 4);
              }
              handleChange(e);
            }}
            onBlur={handleBlur}
            value={values.otp}
            type="text"
            placeholder="Eg: 1234 (4 digits)"
            className={`input input-bordered w-full ${
              touched.otp && errors.otp ? "input-error" : ""
            }`}
          />
          <label onClick={handleResendOtp} className="btn min-w-20">
            {counter === 0 ? "Resend" : counter + " s"}
          </label>
        </div>
        <div className="modal-action">
          <div className="flex gap-2">
            <button
              disabled={isPending}
              type="submit"
              className="btn btn-primary"
            >
              {isPending ? "Processing..." : "Verify"}
            </button>
            <label
              className="btn btn-outline"
              onClick={() => {
                const modal = document.getElementById(
                  `my_modal_otp_verify`
                ) as HTMLDialogElement;
                modal?.close();
                resetForm();
              }}
            >
              Close
            </label>
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default ModalOtpVerify;
