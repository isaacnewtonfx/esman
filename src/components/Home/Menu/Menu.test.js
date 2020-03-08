import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';

import Menu from '.';

configure({adapter: new Adapter()});
const mockStore = configureMockStore([thunk]);


let store;
let wrapper;
// beforeEach(() => {
//     store = mockStore({authToken:"aa"});
//     wrapper = mount(
//                 <Provider store={store}>
//                     <Menu />
//                 </Provider>
//                 );
// });

describe("<Menu/>", () => {

    it("should show sign in link when not authenticated", () => {

        store = mockStore({authToken:""});
        wrapper = mount(
                    <Provider store={store}>
                        <Menu />
                    </Provider>
                    );

        expect(wrapper.find(Menu).find("a[title='Sign In']")).toHaveLength(1);
    });


    it("should show profile link when authenticated", () => {

        store = mockStore({authToken:"aaa.bbb.ccc"});
        wrapper = mount(
                    <Provider store={store}>
                        <Menu />
                    </Provider>
                    );

        expect(wrapper.find(Menu).find("a[title='Signed In']")).toHaveLength(1);
    });


});