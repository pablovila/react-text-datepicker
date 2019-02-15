import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Simulate } from "react-dom/test-utils";

import TextDatepicker from "src/";

describe("TextDatepicker", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div");
    document.body.appendChild(node);
  });

  afterEach(() => {
    document.body.removeChild(node);
    unmountComponentAtNode(node);
  });

  it("displays three inputs", () => {
    render(<TextDatepicker />, node);
    expect(node.querySelectorAll("input").length).toBe(3);
  });

  it("separator by default is /", () => {
    render(<TextDatepicker />, node);
    expect(node.textContent).toContain("/");
  });

  it("separator can be changed", () => {
    render(<TextDatepicker separator="-" />, node);
    expect(node.textContent)
      .toNotContain("/")
      .toContain("-");
  });

  it("hints by default are enabled", () => {
    render(<TextDatepicker />, node);
    expect(node.innerHTML).toContain("placeholder");
  });

  it("hints can be disabled", () => {
    render(<TextDatepicker hints={false} />, node);
    expect(node.innerHTML).toNotContain("placeholder");
  });

  it("hints have a default value", () => {
    render(<TextDatepicker />, node);
    expect(node.innerHTML)
      .toContain("DD")
      .toContain("MM")
      .toContain("YYYY");
  });

  it("hints are customizable", () => {
    render(<TextDatepicker dayHint="day" />, node);
    expect(node.innerHTML).toContain("day");
  });

  it("value is a passed to the three inputs", () => {
    render(<TextDatepicker value={new Date()} />, node);
    expect(node.innerHTML)
      .toContain(`value="${new Date().getDate()}`)
      .toContain(`value="${new Date().getMonth() + 1}`)
      .toContain(`value="${new Date().getFullYear()}`);
  });

  it("onChange is called", () => {
    const initialValue = new Date(2019, 1, 15);
    const finalValue = new Date(2010, 0, 1);

    render(
      <TextDatepicker value={initialValue} onChange={newValue => newValue} />,
      node
    );

    const dayInput = node.getElementsByClassName("rtdp-day")[0];
    const monthInput = node.getElementsByClassName("rtdp-month")[0];
    const yearInput = node.getElementsByClassName("rtdp-year")[0];

    expect(dayInput.value).toBe(`${initialValue.getDate()}`);
    expect(monthInput.value).toBe(`${initialValue.getMonth() + 1}`);
    expect(yearInput.value).toBe(`${initialValue.getFullYear()}`);

    dayInput.value = `${finalValue.getDate()}`;
    Simulate.change(dayInput);

    monthInput.value = `${finalValue.getMonth() + 1}`;
    Simulate.change(monthInput);

    yearInput.value = `2000`;
    Simulate.change(yearInput);

    yearInput.value = `${finalValue.getFullYear()}`;
    Simulate.change(yearInput);

    expect(dayInput.value).toBe(`${finalValue.getDate()}`);
    expect(monthInput.value).toBe(`${finalValue.getMonth() + 1}`);
    expect(yearInput.value).toBe(`${finalValue.getFullYear()}`);
  });

  it("checks all months and leap years", () => {
    const initialValue = new Date();

    render(
      <TextDatepicker value={initialValue} onChange={newValue => newValue} />,
      node
    );

    const monthInput = node.getElementsByClassName("rtdp-month")[0];
    expect(monthInput.value).toBe(`${initialValue.getMonth() + 1}`);

    const yearInput = node.getElementsByClassName("rtdp-year")[0];
    expect(yearInput.value).toBe(`${initialValue.getFullYear()}`);

    monthInput.value = `9`;
    Simulate.change(monthInput);

    expect(monthInput.value).toBe("9");

    monthInput.value = `2`;
    Simulate.change(monthInput);

    yearInput.value = `2000`;
    Simulate.change(yearInput);

    expect(monthInput.value).toBe("2");
    expect(yearInput.value).toBe("2000");
  });

  it("checks invalid dates", () => {
    const initialValue = new Date();

    render(
      <TextDatepicker value={initialValue} onChange={newValue => newValue} />,
      node
    );

    const dayInput = node.getElementsByClassName("rtdp-day")[0];
    expect(dayInput.value).toBe(`${initialValue.getDate()}`);

    dayInput.value = "40";
    Simulate.change(dayInput);

    expect(dayInput.value).toBe("40");
  });
});
