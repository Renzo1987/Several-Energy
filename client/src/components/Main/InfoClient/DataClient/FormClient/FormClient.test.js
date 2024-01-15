import React from "react";
import { shallow } from "enzyme";
import FormClient from "./FormClient";

describe("FormClient", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FormClient />);
    expect(wrapper).toMatchSnapshot();
  });
});
