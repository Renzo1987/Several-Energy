import React from "react";
import { shallow } from "enzyme";
import Invoice from "./Invoice";

describe("Invoice", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Invoice />);
    expect(wrapper).toMatchSnapshot();
  });
});
