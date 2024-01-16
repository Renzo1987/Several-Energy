import React from "react";
import { shallow } from "enzyme";
import FormDataExtra from "./FormDataExtra";

describe("FormDataExtra", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FormDataExtra />);
    expect(wrapper).toMatchSnapshot();
  });
});
