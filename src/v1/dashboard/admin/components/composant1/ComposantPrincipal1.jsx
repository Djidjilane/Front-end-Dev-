import React from 'react';
import SubComponent1 from './sub-components/SubComponent1';
import SubComponent2 from './sub-components/SubComponent2';
import SubComponent3 from './sub-components/SubComponent3';



const ComposantPrincipal1 = () => {
return(
  <div className="bg-white rounded-lg h-72  shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2 active:scale-95">
    <SubComponent1/>
    <SubComponent2/>
    <SubComponent3/>
  </div>
);
};

export default ComposantPrincipal1;
