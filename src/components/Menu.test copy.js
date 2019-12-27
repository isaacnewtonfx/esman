import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from 'enzyme-adapter-react-16';

import {Menu} from './Menu';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();



describe("<Menu/>", () => {

    let store;
    let wrapper;

    jest.mock('react-redux', () => ({
        useDispatch: ()=> {},
        useSelector: () => ({
            authToken: "aaa.bbb.ccc"
        })
    }));


    store = mockStore({authToken:"aaa.bbb.ccc"});
    wrapper = shallow(
                <Provider store={store}>
                    <Menu />
                </Provider>
                );
                    

    it("should show sign in link when not authenticated", () => {
        expect(wrapper.find("a[title='aaa']")).toHaveLength(1);
    });


});