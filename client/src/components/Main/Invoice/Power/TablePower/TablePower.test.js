import React from "react";
import { shallow } from "enzyme";
import TablePower from "./TablePower";

describe("TablePower", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TablePower />);
    expect(wrapper).toMatchSnapshot();
  });
});
