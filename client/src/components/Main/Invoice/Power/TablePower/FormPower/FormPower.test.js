import React from "react";
import { shallow } from "enzyme";
import FormPower from "./FormPower";

describe("FormPower", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FormPower />);
    expect(wrapper).toMatchSnapshot();
  });
});
