<<<<<<< HEAD:client/src/components/Footer/Footer.test.js
import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";

describe("Footer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
=======
import React from "react";
import { shallow } from "enzyme";
import Cups from "./Cups";

describe("Cups", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Cups />);
    expect(wrapper).toMatchSnapshot();
  });
});
>>>>>>> dev:client/src/components/Main/InfoClient/Cups/Cups.test.js
