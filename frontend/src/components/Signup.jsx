import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../services/endpoints/users";
export const Signup = () => {
  const [email, setEmail] = useState(null);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [errorMessages, setErrorMessages] = useState("");
  const navigate = useNavigate();
  const onFinish = async (e) => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password,
      email: email,
      password2: password,
    };
    try {
      const response = await register(credentials);
      if (response.status === 201) {
        login({ username: username, password: password });
        navigate("/dashboard");
      }
    } catch (error) {
      setIsValid(false);
      if (error.response && typeof error.response.data === "object") {
        const errorMessagesList = Object.entries(error.response.data).map(
          ([key, value]) => key !== "password2" && `${key}: ${value.join(", ")}` // Concatenate key and error messages
        );
        setErrorMessages(errorMessagesList);
      } else {
        setErrorMessages("An error occurred during registration.");
      }
      console.error(error);
    }
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h2" color="blue-gray">
        Create account
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Fill in the following details to create your account.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onFinish}>
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="email"
            color="pink"
            onChange={(e) => {
              setEmail(e.target.value);
              setIsValid(true);
            }}
            error={!isValid}
          />
          <Input
            size="lg"
            label="username"
            color="pink"
            onChange={(e) => {
              setUsername(e.target.value);
              setIsValid(true);
            }}
            error={!isValid}
          />
          <Input
            type="password"
            size="lg"
            label="password"
            color="pink"
            onChange={(e) => {
              setPassword(e.target.value);
              setIsValid(true);
            }}
            error={!isValid}
          />
          {!isValid && (
            <Typography color="red" className="mt-2 text-center font-normal">
              <ul>
                {errorMessages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </Typography>
          )}
        </div>
        <Button className="mt-6 bg-pink-300" fullWidth type="submit">
          Sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/login">
            <span
              href="#"
              className="font-medium text-pink-200 transition-colors hover:text-pink-700"
            >
              Login
            </span>
          </Link>
        </Typography>
      </form>
    </Card>
  );
};
