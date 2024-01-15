import React from "react";
import { shallow } from "enzyme";
import FormCups from "./FormCups";

describe("FormCups", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FormCups />);
    expect(wrapper).toMatchSnapshot();
  });
});
