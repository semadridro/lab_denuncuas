import React from 'react';

function Footer () {
  return (
    <div className="bg-gray-100 h-32 text-center">
      <div className="container mx-auto flex flex-col">
        <p className="px-4 py-8 text-gray-700 font-light text-sm fixdet">
        &copy;{(new Date()).getFullYear()} Viña Emiliana
        </p>
      </div>
    </div>
  );
};

export default Footer;
