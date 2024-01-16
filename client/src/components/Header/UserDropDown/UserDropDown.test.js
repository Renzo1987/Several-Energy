import React from "react";
import { shallow } from "enzyme";
import UserDropDown from "./UserDropDown";

describe("UserDropDown", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<UserDropDown />);
    expect(wrapper).toMatchSnapshot();
  });
});
