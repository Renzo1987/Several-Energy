import React from "react";
import { shallow } from "enzyme";
import InfoClient from "./InfoClient";

describe("InfoClient", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<InfoClient />);
    expect(wrapper).toMatchSnapshot();
  });
});
