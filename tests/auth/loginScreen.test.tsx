import { render, screen ,fireEvent} from "@testing-library/react-native";
import React from "react";
import LoginScreen from "../../app/(auth)/login";
import { signInWithEmailAndPassword } from "firebase/auth";

// Mock different things like other services that are used to make them work, like firebsae and expo router
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(),
}));


jest.mock("../../firebase", () => ({
  auth: {},
}));


jest.mock("expo-router", () => ({
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("LoginScreen", () => {
  it("renders the login button", () => {
    render(<LoginScreen />);
    expect(screen.getByText("Login")).toBeTruthy();
  });
  //doing tests to chck thtat they render

  it("renders the email and password fields", () => {
    render(<LoginScreen />);
    expect(screen.getByText("Email:")).toBeTruthy();
    expect(screen.getByText("Password:")).toBeTruthy();
  });

  it("renders the initial message", () => {
    render(<LoginScreen />);
    expect(screen.getByText("Please Login")).toBeTruthy();
  });


// tests for screen inputs
  it("updates email when typed into", () => {
    render(<LoginScreen />);
    const emailInput = screen.getAllByDisplayValue("")[0];
    fireEvent.changeText(emailInput, "test@test.com");
    expect(screen.getByDisplayValue("test@test.com")).toBeTruthy();
  });

  it("updates password when typed into", () => {
    render(<LoginScreen />);
    const passwordInput = screen.getAllByDisplayValue("")[1];
    fireEvent.changeText(passwordInput, "password123");
    expect(screen.getByDisplayValue("password123")).toBeTruthy();
  });

  // button press test
  it("calls signInWithEmailAndPassword when login is pressed", () => {
    render(<LoginScreen />);
    fireEvent.press(screen.getByText("Login"));
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
});