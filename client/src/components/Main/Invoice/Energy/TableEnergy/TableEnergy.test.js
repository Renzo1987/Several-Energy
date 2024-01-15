import React from "react";
import { shallow } from "enzyme";
import TableEnergy from "./TableEnergy";

describe("TableEnergy", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TableEnergy />);
    expect(wrapper).toMatchSnapshot();
  });
});
