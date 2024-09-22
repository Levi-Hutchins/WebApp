import {render, screen, cleanup} from "@testing-library/react"
import React from "react"; // Import React directly

import "@testing-library/jest-dom"
import CustomButton from "../../Components/Button/CustomButton"
import CheckoutForm from "./Components/CheckoutForm";

// Resets DOM after each test case
afterEach(() => {
    cleanup();
})

describe("Cart Page", () => {
    test("Display Value on Button", () => {
        render(<CustomButton displayValue={"Checkout"}/>);
        const text = screen.getByText("Checkout")
        expect(text).toBeInTheDocument();
    })
    
})