import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Home} from '.';

import Menu from '../Menu';
import Drawer from '../Drawer';
import LeafletMap from '../Map';

configure({adapter: new Adapter()});


let wrapper;
beforeEach(() => {
    wrapper = shallow(<Home/>);
});

describe("<Home />" , ()=>{

    it("should have <Menu/>, <Drawer/> and <LeafletMap/> on homepage", ()=>{

        expect(wrapper.find(Menu)).toHaveLength(1);
        expect(wrapper.find(Drawer)).toHaveLength(1);
        expect(wrapper.find(LeafletMap)).toHaveLength(1);

    });

    it("should not show gallery viewer when isGalleryOpen is not set", ()=>{
        expect(wrapper.find(".gallerySection")).toHaveLength(0);
    });

    it("should show gallery viewer when isGalleryOpen is set", ()=>{
        wrapper.setProps({galleryViewerImages:[], isGalleryOpen:true});
        expect(wrapper.find(".gallerySection")).toHaveLength(1);
    });

})