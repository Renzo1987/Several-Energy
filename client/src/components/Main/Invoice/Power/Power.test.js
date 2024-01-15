import React from "react";
import { shallow } from "enzyme";
import Power from "./Power";

describe("Power", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Power />);
    expect(wrapper).toMatchSnapshot();
  });
});
