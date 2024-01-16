import React from "react";
import { shallow } from "enzyme";
import Cups from "./Cups";

describe("Cups", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Cups />);
    expect(wrapper).toMatchSnapshot();
  });
});
