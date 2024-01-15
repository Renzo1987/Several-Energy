import React from "react";
import { shallow } from "enzyme";
import DataClient from "./DataClient";

describe("DataClient", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DataClient />);
    expect(wrapper).toMatchSnapshot();
  });
});
