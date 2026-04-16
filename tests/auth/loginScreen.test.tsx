import { render, screen } from "@testing-library/react-native";
import React from "react";
import LoginScreen from "../../app/(auth)/login";

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
});
