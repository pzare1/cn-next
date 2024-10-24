"use client"

import { VscAccount } from "react-icons/vsc";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import Link from "next/link";

interface formData {
  username?: string;
  email: string;
  password: string;
}

function AuthForm({ type }: { type: "register" | "login" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues:
      type == "register"
        ? { username: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  const onSubmitForm = (data:formData) => {
    console.log(data)
  }

  return (
    <>
      <div className="auth">
        <div className="overlay">
          <div className="content">
            <img src="" />
            <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
              {type == "register" && (
                <>
                  <div className="input">
                    <input
                      {...register("username", {
                        required: "The username is needed",
                        validate: (value: string | undefined) => {
                          if (!value || value.length < 2) {
                            return "The value should be more than two words";
                          }
                          return true
                        },
                      })}
                      type="text"
                      placeholder="Username"
                      className="input-field"
                    />
                    <VscAccount className="text-white/80" />
                  </div>
                  {errors.username && <span className="error">{errors.username.message}</span>}
                </>
              )}

              <div className="input">
                <input
                       {...register("email", {
                        required: "The email is needed",
                      })}
                  type="email"
                  placeholder="Email"
                  className="input-field"
                />
                <MdOutlineMarkEmailRead className="text-white/80" />
              </div>
              {errors.email && <span className="error">{errors.email.message}</span>}
              <div className="input">
                <input
                     {...register("password", {
                        required: "The password is needed",
                        validate: (value: string | undefined) => {
                          if (!value || value.length < 5 || value.length> 20 || !value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/)) {
                            return "The value should be between 5 and 20 and consist a special character";
                          }
                          return true
                        },
                      })}
                  type="password"
                  placeholder="Password"
                  className="input-field"
                />
                <IoLockClosedOutline className="text-white/80" />
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
              <button className="button" type="submit">
                {type === "register" ? "Join Free" : "Let's Watch"}
              </button>
            </form>
            {type === "register" ? (
              <Link href="/login">
                <p className="link">Already have an account? Log In Here</p>
              </Link>
            ) : (
              <Link href="/register">
                <p className="link">Don't have an account? Register Here</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthForm;
