import React from "react";
import { shallow } from "enzyme";
import FormEnergy from "./FormEnergy";

describe("FormEnergy", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FormEnergy />);
    expect(wrapper).toMatchSnapshot();
  });
});
