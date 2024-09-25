import {render, screen, cleanup} from "@testing-library/react"
import React from "react"; // Import React directly
import '@testing-library/jest-dom';

import "@testing-library/jest-dom"
import CustomButton from "../../shared-components/Button/CustomButton"
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