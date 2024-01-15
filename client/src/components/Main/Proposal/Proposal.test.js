import React from "react";
import { shallow } from "enzyme";
import Proposal from "./Proposal";

describe("Proposal", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Proposal />);
    expect(wrapper).toMatchSnapshot();
  });
});
