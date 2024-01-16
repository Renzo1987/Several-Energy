import React from "react";
import { shallow } from "enzyme";
import DataExtra from "./DataExtra";

describe("DataExtra", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DataExtra />);
    expect(wrapper).toMatchSnapshot();
  });
});
