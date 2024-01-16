import React from "react";
import { shallow } from "enzyme";
import Energy from "./Energy";

describe("Energy", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Energy />);
    expect(wrapper).toMatchSnapshot();
  });
});
